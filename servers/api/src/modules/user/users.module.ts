import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersResolvers } from './users.resolvers';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    UsersResolvers,
    UsersService,
    ...usersProviders
  ],
})
export class UsersModule { }
 