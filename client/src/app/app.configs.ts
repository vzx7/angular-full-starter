/**
 * Settings app.
 */
interface AppConfig {
  // api
  api: {
    worker: string;
  };
}

export const appConfig: AppConfig = {
  api: {
    worker: 'worker',
  }
};
