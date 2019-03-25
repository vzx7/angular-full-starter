import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { filesProviders } from './files.providers';
import { FilesResolvers } from './files.resolvers';
import { FilesService } from './services/files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    FilesResolvers,
    FilesService,
    ...filesProviders
  ],
})
export class FilesModule { }
