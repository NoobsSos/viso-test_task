import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WebhookController } from './controller/webhook/webhook.controller';

@Module({
  controllers: [AppController, WebhookController],
  providers: [AppService],
})
export class AppModule {}
