import { ITeam } from '../ITeam';

export interface ITeamsModel {
  // create(data: Partial<ITeam>): Promise<ITeam>,
  findAll(): Promise<ITeam[]>
  findById(id: number): Promise<ITeam | null>
}
