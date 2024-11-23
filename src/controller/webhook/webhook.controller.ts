import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { WebsocketMessageGateway } from 'src/gateway/websocket/websocket.gateway';
import { RowsService } from 'src/service/rows/rows.service';


@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly websocketGateway: WebsocketMessageGateway,
        private readonly rowsService: RowsService, 
      ) {}
  @Post()
  async handleWebhook(@Body() body: any) {
    try {
      console.log('Webhook data received:', body);

      const { row, column, values, sheetName } = body;

      this.websocketGateway.sendMessage(body);

      // Потім додаємо новий запис у базу даних
      const newRow = await this.rowsService.createRow({
        row,
        column,
        values,
        sheetName,
      });

      console.log('New row created:', newRow);

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
