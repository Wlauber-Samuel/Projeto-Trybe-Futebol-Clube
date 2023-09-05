import { ITeamsModel } from '../Interfaces/Imodel/ITeamsModel';
import TeamsModel from '../models/teamsModel';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async getAllTeamsService(): Promise<ITeam[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async getTeamByIdService(id: number): Promise<ITeam | null> {
    const team = await this.teamsModel.findById(id);
    return team;
  }
}
