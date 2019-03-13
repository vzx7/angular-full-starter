import { join } from 'path';

import { FastifyAdapter, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from './modules/config/services/config.service';

async function bootstrap() {
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  const port = config.port;
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useStaticAssets({
    root: join(__dirname, '..', '..', 'dist', 'client')
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  console.log(`server up on http://localhost:${port}/`);
}
bootstrap();
