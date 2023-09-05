import { IScore } from '../Interfaces/IScore';
import { IMatch, INewMatch } from '../Interfaces/IMatch';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAllMatchesService(boolInProgress: boolean | null): Promise<IMatch[]> {
    const allMatches = await this.matchesModel.findAll(boolInProgress);
    return allMatches;
  }

  public async finishMatchService(id: number) {
    await this.matchesModel.finishMatch(id);
  }

  public async updateScoreService(id: number, score: IScore) {
    await this.matchesModel.updateScore(id, score);
  }

  public async createMatchService(newMatch: INewMatch) {
    const createdMatch = await this.matchesModel.createMatch(newMatch);
    return createdMatch;
  }
}
