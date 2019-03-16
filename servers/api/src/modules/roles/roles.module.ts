import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { rolesProviders } from './roles.providers';
import { RolesResolvers } from './roles.resolvers';
import { RolesService } from './services/roles.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    RolesService,
    RolesResolvers,
    ...rolesProviders
  ],
})
export class RolesModule { }
