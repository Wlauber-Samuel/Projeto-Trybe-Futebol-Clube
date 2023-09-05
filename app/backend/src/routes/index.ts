import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import loginRouter from './loginRoutes';
import matchesRouter from './matchesRoutes';
import leaderboardRouter from './leaderboardRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
