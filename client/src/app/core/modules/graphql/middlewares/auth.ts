import { setContext } from 'apollo-link-context';
import { ApolloLink, GraphQLRequest } from 'apollo-link';
import { AuthService } from 'modules/auth/services/auth.service';

/**
 *  Auth middleware
 * @param authService Service for autorization
 * @return ApolloLink
 */
export const createAuthLink = (authService: AuthService):  ApolloLink => {
  const authLink = setContext((operation: GraphQLRequest, prevContext: any) => {
    const jwt: string = authService.getJwt();

    if (!jwt) {
      return {};
    } else {
      return {
        headers: { Authorization: `Bearer ${jwt}` }
      };
    }
  });

  return authLink;
};
