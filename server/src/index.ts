import { config } from './config';
import app from './app';
import logger from './utils/logger';
import { connect } from './config/db';

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
  logger.info('Connecting to MongoDB...');
  connect()
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error('MongoDB connection error:', error);
      process.exit(1);
    });
});
