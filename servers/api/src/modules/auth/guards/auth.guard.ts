import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { Observable } from 'rxjs';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context.host';

@Injectable()
// In order to use AuthGuard together with GraphQL, you have to extend
// the built-in AuthGuard class and override getRequest() method.
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
}
