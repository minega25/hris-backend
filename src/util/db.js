import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connect = async (
  opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
) =>
  mongoose
    .connect(process.env.DATABASE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      ...opts,
    })
    .then(() => logger.info('database Connected'))
    .catch((err) => logger.info(`Failed to connect to db ${err.reason}`));
