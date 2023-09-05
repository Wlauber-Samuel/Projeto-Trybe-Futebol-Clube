import { Request, Response, NextFunction } from 'express';

export default class MatchValidation {
  static matchValidation(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (Number(homeTeamId) === Number(awayTeamId)) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
