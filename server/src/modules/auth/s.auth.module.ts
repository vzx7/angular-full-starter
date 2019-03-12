import { Module } from '@nestjs/common';
import { SAuthService } from './services/auth/s.auth.service';

@Module({
  providers: [SAuthService],
})
export class SAuthModule {}