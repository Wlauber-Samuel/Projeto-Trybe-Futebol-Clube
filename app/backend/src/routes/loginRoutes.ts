import { Request, Router, Response, NextFunction } from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../sevices/loginService';
import Encryptor from '../middlewares/encryptor';
import LoginMiddleware from '../middlewares/loginMiddleware';
import Token from '../middlewares/token';

const encryptor = new Encryptor();
const loginService = new LoginService();
const loginController = new LoginController(loginService, encryptor);

const router = Router();

// Endpoint - Requisito 8
router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => LoginMiddleware
    .loginValidations(req, res, next),
  (req, res) => loginController.loginController(req, res),
);

// Endpoint - Requisito 12
router.get(
  '/role',
  (req, res, next) => Token.tokenValidation(req, res, next),
  (req, res) => Token.getRole(req, res),
);

export default router;
