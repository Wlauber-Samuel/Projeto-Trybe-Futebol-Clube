import { ITeamsModel } from '../Interfaces/Imodel/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    // console.log('dbData no TeamsModel findAll():', dbData);
    const AllTeams = dbData.map((team) => team.dataValues);
    return AllTeams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    return dbData ? dbData.dataValues : null;
  }
}
