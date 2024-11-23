import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { LoggingInterceptor } from './decorators/httpLogger';
import cors from 'cors-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
