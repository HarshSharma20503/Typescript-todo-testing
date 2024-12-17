// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';
import { config } from '../config';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header or cookies
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) throw new UnauthorizedError('Authentication required');

    // Verify the token
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};
