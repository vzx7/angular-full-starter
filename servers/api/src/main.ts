import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from './modules/config/services/config.service';

import cors = require('cors');
import { join } from 'path';

async function bootstrap() {
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  const port = config.port;
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  console.log(join(__dirname, 'uploads'));
  app.useStaticAssets(join(__dirname, 'uploads'));
  await app.listen(port);
  console.log(`Api server run now at port http://localhost:${port}/`);
}
bootstrap();
