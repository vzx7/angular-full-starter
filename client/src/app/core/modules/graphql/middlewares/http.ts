import { environment } from '../../../../../environments/environment';

// No need for file upload??
const UPLOAD_API_ENDPOINT = `http://${environment.HOST}:${environment.PORT}/${environment.GRAPHQL_PATH}`;
function createHttpLink(httpLink) {
  const http = httpLink.create({
    uri: UPLOAD_API_ENDPOINT || environment.GITHUB_GRAPHQL_API_ENDPOINT
  });
}

export { createHttpLink };
