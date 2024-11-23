import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Row } from './schemas/Row.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private sequelize: Sequelize, private readonly mailService: MailerService) {}

  async onModuleInit() {
    try {
      await this.sequelize.sync({ alter: true }); 
      console.log('Database synced');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  sendMail(emails: string[]) {
    const message = `There were 10 new rows changes`;

    this.mailService.sendMail({
      from: 'Nazar <Hello@gmail.com>',
      to: emails,
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
