import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';

import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
    constructor(private readonly appService: AppService) {}

    async addUsers(emails: string[]): Promise<void> {
      const existingUsers = await User.findAll({
        attributes: ['email'],
      });
  
      const existingEmailsSet = new Set(existingUsers.map(user => user.email));
  
      const newEmails = emails.filter(email => !existingEmailsSet.has(email));
  
      const emailsToDelete = existingUsers
        .map(user => user.email)
        .filter(email => !emails.includes(email));
  
      if (emailsToDelete.length > 0) {
        await User.destroy({
          where: {
            email: emailsToDelete,
          },
        });
        console.log(`Removed ${emailsToDelete.length} users`);
      }
  
      if (newEmails.length > 0) {
        const usersToCreate = newEmails.map(email => ({ email }));
        await User.bulkCreate(usersToCreate, { ignoreDuplicates: true });
        console.log(`Added ${newEmails.length} new users`);
      } else {
        console.log('No new users to add');
      }
    }

    async sendEveryUserEmail() {
        const users = await User.findAll();
        this.appService.sendMail(users.map(user => user.email));
      }
  }
