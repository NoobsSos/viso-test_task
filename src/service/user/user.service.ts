import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';


@Injectable()
export class UserService {
  async addUsers(emails: string[]): Promise<void> {
    const existingUsers = await User.findAll({
      where: { email: emails },
      attributes: ['email'],
    });

    const existingEmailsSet = new Set(existingUsers.map(user => user.email));

    const newEmails = emails.filter(email => !existingEmailsSet.has(email));

    if (newEmails.length > 0) {
      const usersToCreate = newEmails.map(email => ({ email }));
      await User.bulkCreate(usersToCreate, { ignoreDuplicates: true });
      console.log(`Added ${newEmails.length} new users`);
    } else {
      console.log('No new users to add');
    }
  }
}