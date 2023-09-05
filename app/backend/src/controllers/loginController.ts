import { Request, Response } from 'express';
import LoginService from '../sevices/loginService';
import { IEncryptor } from '../Interfaces/IEncryptor';
import Token from '../middlewares/token';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
    private encryptor: IEncryptor,
    private token = new Token(),
  ) {}

  public async loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.loginService.getUserByEmail(email);
    if (!user) { return res.status(401).json({ message: 'Invalid email or password' }); }

    const passwordValidation = await this.encryptor.compare(password, user.password);
    if (!passwordValidation) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const userToken = await this.token.getToken(user);
    return res.status(200).json({ token: userToken });
  }
}
