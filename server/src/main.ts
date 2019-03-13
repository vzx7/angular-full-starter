import { NestFactory, FastifyAdapter } from '@nestjs/core';

import { AppModule } from './app.module';
import { join } from 'path';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useStaticAssets({
    root: join(__dirname, '..', '..', 'dist', 'client')
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
  console.log('server up on http://localhost:3000/');
}
bootstrap();
