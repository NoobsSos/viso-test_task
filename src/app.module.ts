import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { Row } from './schemas/Row.schema';

import { WebhookController } from './controller/webhook/webhook.controller';
import { WebsocketMessageGateway } from './gateway/websocket/websocket.gateway';
import { RowsController } from './controller/rows/rows.controller';
import { RowsService } from './service/rows/rows.service';



@Module({
  imports: [
    ConfigModule.forRoot(), 

    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres', 
    models: [Row], 
    synchronize: true,
    logging: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,  
      },
    },  
  }),

  SequelizeModule.forFeature([Row]),],
  controllers: [AppController, WebhookController, RowsController],
  providers: [AppService, WebsocketMessageGateway, RowsService],
})
export class AppModule {}
