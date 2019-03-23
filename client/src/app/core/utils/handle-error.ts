import { Observable, throwError } from 'rxjs';

/**
 * Error handler for apolo server
 * @param err any
 * @return Observable<never>
 */
export const handleError = (err: any): Observable<never> => {
  if (err.graphQLErrors) {
    let error = null;

    err.graphQLErrors.forEach((e: any) => {
      error = {
        code: e.extensions.code,
        message: e.message,
        path: e.path,
        stacktrace: e.extensions.exception.stacktrace
      };
    });

    return throwError(error);
  }
  if (err.networkError) {
    return throwError(err);
  }
};
