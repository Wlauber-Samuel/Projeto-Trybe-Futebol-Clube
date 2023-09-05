import * as bcrypt from 'bcryptjs';
import { IEncryptor } from '../Interfaces/IEncryptor';

export default class Encryptor implements IEncryptor {
  private bcrypt = bcrypt;

  async encrypt(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const validation = await this.bcrypt.compare(password, hash);
    return validation;
  }
}
