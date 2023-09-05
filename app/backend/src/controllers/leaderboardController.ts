import { Request, Response } from 'express';
import { ITeamStats } from '../Interfaces/ITeamStats';
import LeaderboardAwayController from './leaderboardAwayController';
import LeaderboardHomeController from './leaderboardHomeController';
import LeaderboardMiddleware from '../middlewares/leaderboardMiddleware';

export default class LeaderboardController {
  constructor(
    private leaderboardHome = new LeaderboardHomeController(),
    private leaderboardAway = new LeaderboardAwayController(),
  ) {}

  public async mergingHomeAndAwayStats() {
    const homeTeamsStats = await this.leaderboardHome.getHomeTeamsStats();
    const awayTeamsStats = await this.leaderboardAway.getAwayTeamsStats();

    const teamsFullStats = homeTeamsStats.map((homeTeam) => awayTeamsStats.map((awayTeam) => {
      if (homeTeam.name === awayTeam.name) {
        const efficiency = ((homeTeam.totalPoints + awayTeam.totalPoints)
         / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100;

        return { name: homeTeam.name,
          totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
          totalGames: homeTeam.totalGames + awayTeam.totalGames,
          totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
          totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
          totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
          goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
          goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
          goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
          efficiency: efficiency.toFixed(2) };
      } return '';
    })); return teamsFullStats;
  }

  async getFullClassification(_req: Request, res: Response) {
    const arrayTeams = await this.mergingHomeAndAwayStats();
    const result = arrayTeams
      .map((arrTeam) => arrTeam.find((emptyOrTeam) => emptyOrTeam !== ''));

    const sortedTeamsFullStats = LeaderboardMiddleware.sortedClassification(result as ITeamStats[]);
    return res.status(200).json(sortedTeamsFullStats);
  }
}
