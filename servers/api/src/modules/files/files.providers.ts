import { Connection } from 'mongoose';
import { FileSchema } from '../../modules/database/schemas/file.shema';

/**
 * Provider for files
 */
export const filesProviders = [
  {
    provide: 'FileModelToken',
    useFactory: (connection: Connection) => connection.model('File', FileSchema),
    inject: ['DbConnectionToken'],
  },
];
