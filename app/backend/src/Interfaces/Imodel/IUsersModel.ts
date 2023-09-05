import { IUser } from '../IUser';

export interface IUsersModel {
  findOne(email: string): Promise<IUser | null>
}
