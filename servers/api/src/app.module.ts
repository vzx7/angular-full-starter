require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigModule } from './modules/config/config.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUri,
        useNewUrlParser: true,
        useCreateIndex: true
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
