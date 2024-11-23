import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    NotFoundException,
  } from '@nestjs/common';
import { RowDto } from 'src/dto/CreateRow.dto';
import { RowsService } from 'src/service/rows/rows.service';
  
  @Controller('rows')
  export class RowsController {
    constructor(private readonly rowsService: RowsService) {}
  
    @Post()
    async createRow(@Body() createRowDto: RowDto) {
      return this.rowsService.createOrUpdateRow(createRowDto);
    }
  
    @Get()
    async getAllRows() {
      return this.rowsService.findAll();
    }
  
    @Get(':id')
    async getRowById(@Param('id') id: string) {
      const row = await this.rowsService.findOneById(+id);
      if (!row) {
        throw new NotFoundException('Row not found');
      }
      return row;
    }
  
    @Patch(':id')
    async updateRow(
      @Param('id') id: string,
      @Body() updateRowDto:RowDto,
    ) {
      const updatedRow = await this.rowsService.update(+id, updateRowDto);
      if (!updatedRow) {
        throw new NotFoundException('Row not found for update');
      }
      return updatedRow;
    }
  }
  