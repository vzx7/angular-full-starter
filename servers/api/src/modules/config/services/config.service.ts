import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      API_PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      MONGO_URL: Joi.string().required(),
      MONGO_DB_NAME: Joi.string().required(),
      MONGO_PORT: Joi.number().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get port(): string {
    return String(this.envConfig.API_PORT);
  }

  get mongoUri(): string {
    return String(this.envConfig.MONGO_URL);
  }

  get mongoPort(): string {
    return String(this.envConfig.MONGO_PORT);
  }

  get mongoDbName(): string {
    return String(this.envConfig.MONGO_DB_NAME);
  }
}