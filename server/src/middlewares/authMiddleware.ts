import { env } from '../config/env.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new Error('Unauthorized');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    // ✅ Important: don't return res.json — just call next() with an error
    next(err);
  }
};
