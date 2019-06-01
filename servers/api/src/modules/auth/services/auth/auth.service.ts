import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { environment } from 'environments/environment';
import { JwtPayload } from 'modules/auth/models/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor() {}

  createToken(jwtPayload: JwtPayload) {
    return jwt.sign(
      {
        ...jwtPayload,
      },
      environment.secret,
      { expiresIn: environment.expiresIn },
    );
  }
}
