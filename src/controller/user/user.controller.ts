import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUsers(@Body() emails: string[]): Promise<void> {
    await this.userService.addUsers(emails);
  }
}