import { ITeamStats } from '../Interfaces/ITeamStats';

export default class LeaderboardMiddleware {
  public static sortedClassification(teamsStats: ITeamStats[]) {
    const sortedByGoalsFavor = teamsStats
      .sort((a, b) => b.goalsFavor - a.goalsFavor);

    const sortedByGoalsBalance = sortedByGoalsFavor
      .sort((a, b) => b.goalsBalance - a.goalsBalance);

    const sortedByVictories = sortedByGoalsBalance
      .sort((a, b) => b.totalVictories - a.totalVictories);

    return sortedByVictories.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
