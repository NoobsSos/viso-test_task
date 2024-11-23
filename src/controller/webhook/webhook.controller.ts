import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  async handleWebhook(@Body() body: any) {
    try {
      console.log('Webhook data received:', body);

      const { row, column, values, sheetName } = body;
  
      return { status: 'success', message: 'Webhook received successfully', data: { row, column, values, sheetName } };
    } catch (error) {
      throw new HttpException('Failed to process webhook', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
