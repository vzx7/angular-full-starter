import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SAuthModule } from './modules/auth/s.auth.module';
import { HttpStrategy } from './modules/auth/services/strategy/http.strategy';

@Module({
  imports: [SAuthModule],
  controllers: [AppController],
  providers: [AppService, HttpStrategy],
})
export class AppModule {}
