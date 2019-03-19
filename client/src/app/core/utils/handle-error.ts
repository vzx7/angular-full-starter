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
        message: e.extensions.exception.errors[0].message,
        path: e.extensions.exception.errors[0].path,
        type: e.extensions.exception.errors[0].type,
        value: e.extensions.exception.errors[0].value
      };
    });

    return throwError(error);
  }
  if (err.networkError) {
    return throwError(err);
  }
};
