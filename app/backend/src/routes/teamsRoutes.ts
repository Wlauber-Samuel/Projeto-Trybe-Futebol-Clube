import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsController = new TeamsController();

const router = Router();

// Endpoint - Requisito 3
router.get(
  '/',
  (req: Request, res: Response) => teamsController.getAllTeamsController(req, res),
);

// Endpoint - Requisito 5
router.get(
  '/:id',
  (req: Request, res: Response) => teamsController.getTeamByIdController(req, res),
);

export default router;
