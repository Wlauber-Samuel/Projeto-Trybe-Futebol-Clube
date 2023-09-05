import { Request, Response, NextFunction } from 'express';

export default class LoginMiddleware {
  static loginValidations(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const RegExEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!(RegExEmail.test(email)) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
