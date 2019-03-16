import * as mongoose from 'mongoose';

import { ConfigService } from '../config/services/config.service';

const config = new ConfigService(`${process.env.NODE_ENV}.env`);

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(`${config.mongoUri}:${config.mongoPort}/${config.mongoDbName}`, { useNewUrlParser: true }),
  },
];
