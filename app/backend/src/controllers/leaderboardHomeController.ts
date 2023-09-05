import { Request, Response } from 'express';
import { IMatch } from '../Interfaces/IMatch';
import MatchesService from '../sevices/matchesService';
import TeamsService from '../sevices/teamsService';
import LeaderboardMiddleware from '../middlewares/leaderboardMiddleware';

export default class LeaderboardHomeController {
  constructor(
    private teamsService = new TeamsService(),
    private matchesService = new MatchesService(),
  ) {
  }

  public async matchesfinishedController() {
    const matchesFinished = await this.matchesService.getAllMatchesService(false);
    return matchesFinished;
  }

  public async getAllTeamsController() {
    const allTeams = await this.teamsService.getAllTeamsService();
    return allTeams;
  }

  static getTotalPoints(teamId: number, allFinishedMatches: IMatch[]) {
    return (this.getTotalVictories(teamId, allFinishedMatches) * 3)
         + (this.getTotalDraws(teamId, allFinishedMatches));
  }

  static getTotalGames(teamId: number, allFinishedMatches: IMatch[]) {
    const allMatches = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allMatches;
  }

  static getTotalVictories(teamId: number, allFinishedMatches: IMatch[]) {
    const allVictories = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId && current.homeTeamGoals > current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allVictories;
  }

  static getTotalDraws(teamId: number, allFinishedMatches: IMatch[]) {
    const allDraws = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId && current.homeTeamGoals === current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allDraws;
  }

  static getTotalLosses(teamId: number, allFinishedMatches: IMatch[]) {
    const allLosses = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId && current.homeTeamGoals < current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allLosses;
  }

  static getGoalsFavor(teamId: number, allFinishedMatches: IMatch[]) {
    const allGoalsFavor = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId) {
        return accumulator + current.homeTeamGoals;
      } return accumulator;
    }, 0);
    return allGoalsFavor;
  }

  static getGoalsOwn(teamId: number, allFinishedMatches: IMatch[]) {
    const allGoalsOwn = allFinishedMatches.reduce((accumulator, current) => {
      if (current.homeTeamId === teamId) {
        return accumulator + current.awayTeamGoals;
      } return accumulator;
    }, 0);
    return allGoalsOwn;
  }

  static getGoalsBalance(teamId: number, allFinishedMatches: IMatch[]) {
    const goalsBalance = this.getGoalsFavor(teamId, allFinishedMatches)
                       - this.getGoalsOwn(teamId, allFinishedMatches);
    return goalsBalance;
  }

  static getEfficiency(teamId: number, allFinishedMatches: IMatch[]) {
    const efficiency = (this.getTotalPoints(teamId, allFinishedMatches)
       / (this.getTotalGames(teamId, allFinishedMatches) * 3)) * 100;
    const result = Number.isNaN(efficiency) ? 'No match' : efficiency.toFixed(2);
    return result;
  }

  public async getHomeTeamsStats() {
    const allTeams = await this.getAllTeamsController();
    const allFinishedMatches = await this.matchesfinishedController();

    const homeTeamsStats = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: LeaderboardHomeController.getTotalPoints(team.id, allFinishedMatches),
      totalGames: LeaderboardHomeController.getTotalGames(team.id, allFinishedMatches),
      totalVictories: LeaderboardHomeController.getTotalVictories(team.id, allFinishedMatches),
      totalDraws: LeaderboardHomeController.getTotalDraws(team.id, allFinishedMatches),
      totalLosses: LeaderboardHomeController.getTotalLosses(team.id, allFinishedMatches),
      goalsFavor: LeaderboardHomeController.getGoalsFavor(team.id, allFinishedMatches),
      goalsOwn: LeaderboardHomeController.getGoalsOwn(team.id, allFinishedMatches),
      goalsBalance: LeaderboardHomeController.getGoalsBalance(team.id, allFinishedMatches),
      efficiency: LeaderboardHomeController.getEfficiency(team.id, allFinishedMatches),
    }));
    return LeaderboardMiddleware.sortedClassification(homeTeamsStats);
  }

  public async resultHomeTeamsStats(_req: Request, res: Response) {
    const homeTeamsStats = await this.getHomeTeamsStats();
    return res.status(200).json(homeTeamsStats);
  }
}
