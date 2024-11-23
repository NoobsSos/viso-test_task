import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Row } from './schemas/Row.schema';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      // Вручну синхронізуємо базу даних
      await this.sequelize.sync({ alter: true });  // { alter: true } дозволяє змінювати існуючі таблиці, якщо потрібно
      console.log('Database synced');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
