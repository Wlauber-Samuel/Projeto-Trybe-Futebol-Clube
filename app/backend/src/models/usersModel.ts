import { IUser } from '../Interfaces/IUser';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsersModel } from '../Interfaces/Imodel/IUsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findOne(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    // console.log(dbData?.dataValues);
    return dbData ? dbData.dataValues : null;
  }
}
// const x = new UsersModel();
// x.findOne('invalid.user@user.com');
