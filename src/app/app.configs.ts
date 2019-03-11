/**
 * Настройки приложения.
 */
interface AppConfig {
  // Настройки api
  api: {
    worker: string;
  };
}

export const appConfig: AppConfig = {
  api: {
    worker: 'worker',
  }
};
