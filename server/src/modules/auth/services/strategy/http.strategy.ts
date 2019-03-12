import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SAuthService } from '../auth/s.auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: SAuthService) {
//     super();
//   }

//   async validate(token: string) {
//     const user = await this.authService.validateUser(token);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
}