import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', {
    error: err,
    path: req.path,
    method: req.method,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  // MongoDB duplicate key error
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    return res.status(400).json(errorResponse('Duplicate entry found'));
  }

  // MongoDB validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json(errorResponse('Validation failed'));
  }

  // Default server error
  return res.status(500).json(errorResponse('Internal server error'));
};
