import UsersModel from '../models/usersModel';
import { IUsersModel } from '../Interfaces/Imodel/IUsersModel';
import { IUser } from '../Interfaces/IUser';

export default class LoginService {
  constructor(private usersModel: IUsersModel = new UsersModel()) {}

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne(email);
    return user;
  }
}
