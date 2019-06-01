import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';

@Injectable()
export class JwtAuthGuard extends GqlAuthGuard {
  canActivate(context: ExecutionContext) {
    // add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
