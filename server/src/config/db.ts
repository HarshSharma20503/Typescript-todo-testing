import mongoose from 'mongoose';
import { config } from './index';
import logger from '../utils/logger';

export const connect = async () => {
  try {
    return mongoose.connect(config.mongoUrl);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};
