import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { WebsocketMessageGateway } from 'src/gateway/websocket/websocket.gateway';
import { RowsService } from 'src/service/rows/rows.service';
import { UserService } from 'src/service/user/user.service';


@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly websocketGateway: WebsocketMessageGateway,
        private readonly rowsService: RowsService, 
        private readonly userService: UserService,
      ) {}
  @Post()
  async handleWebhook(@Body() body: any) {
    try {
      const { row, column, values, sheetName, emails } = body;

      this.websocketGateway.sendMessage(body);

      const newRow = await this.rowsService.createOrUpdateRow({
        row,
        column,
        values,
        sheetName,
      });

      await this.userService.addUsers(emails);

      return { 
        status: 'success', 
        message: 'Webhook received and data saved successfully', 
        data: newRow 
      };
    } catch (error) {
            console.error('Error in handleWebhook:', error);

      throw new HttpException('Failed to process webhook', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
