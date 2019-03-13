import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigModule } from './modules/config/config.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost:27017/full'),
    UserModule
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
