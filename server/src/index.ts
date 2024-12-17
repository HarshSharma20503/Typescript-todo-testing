import app from './app';
import { config } from './config';
import logger from './utils/logger';
import mongoose from 'mongoose';

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
  logger.info('Connecting to MongoDB...');
  mongoose
    .connect(config.mongoUrl)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error('MongoDB connection error:', error);
      process.exit(1);
    });
});
