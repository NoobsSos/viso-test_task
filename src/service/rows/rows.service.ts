import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Row } from 'src/schemas/Row.schema';
import { RowDto } from 'src/dto/CreateRow.dto';

@Injectable()
export class RowsService {
  constructor(@InjectModel(Row) private rowModel: typeof Row) {}

  async createRow(data: any): Promise<Row> {
    console.log('Creating row:', data);
    return this.rowModel.create({
      rowNumber: data.row,
      columnNumber: data.column,
      value: data.values, 
      sheetName: data.sheetName,
    });
  }

  async findAll(): Promise<Row[]> {
    return this.rowModel.findAll();
  }

  async findOneById(id: number): Promise<Row | null> {
    return this.rowModel.findByPk(id);
  }

  async update(id: number, updateRowDto: RowDto): Promise<Row | null> {
    const row = await this.findOneById(id);
    if (!row) {
      return null;
    }
    await row.update(updateRowDto);
    return row;
  }
}
