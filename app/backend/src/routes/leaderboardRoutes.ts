import { Router } from 'express';
import LeaderboardHomeController from '../controllers/leaderboardHomeController';
import LeaderboardAwayController from '../controllers/leaderboardAwayController';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardHomeController = new LeaderboardHomeController();
const leaderboardAwayController = new LeaderboardAwayController();
const leaderboardController = new LeaderboardController();

const router = Router();

// Endpoint - Requisitos 23 e 24
router.get(
  '/home',
  (req, res) => leaderboardHomeController.resultHomeTeamsStats(req, res),
);

// Endpoint - Requisito 26 e 27
router.get(
  '/away',
  (req, res) => leaderboardAwayController.resultAwayTeamsStats(req, res),
);

// Endpoint - Requisito - 29
router.get(
  '/',
  (req, res) => leaderboardController.getFullClassification(req, res),
);

export default router;
