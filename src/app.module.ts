import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { Row } from './schemas/Row.schema';
import { User } from './schemas/User.schema';

import { WebhookController } from './controller/webhook/webhook.controller';
import { WebsocketMessageGateway } from './gateway/websocket/websocket.gateway';
import { RowsController } from './controller/rows/rows.controller';
import { RowsService } from './service/rows/rows.service';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';

import { MailerModule } from '@nestjs-modules/mailer';

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
    models: [Row, User], 
    synchronize: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,  
      },
    },  
  }),

  SequelizeModule.forFeature([Row, User]),

  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  })],
  controllers: [AppController, WebhookController, RowsController, UserController],
  providers: [AppService, WebsocketMessageGateway, RowsService, UserService],
})
export class AppModule {}
