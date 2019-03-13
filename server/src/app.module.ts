import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/full'),
    UserModule
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
