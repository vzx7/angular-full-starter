
import { UsersModule } from './modules/users/users.module';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { ConfigModule } from './modules/config/config.module';
import { RolesModule } from './modules/roles/roles.module';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      playground: true
    }),
    UsersModule,
    RolesModule,
    FilesModule
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
