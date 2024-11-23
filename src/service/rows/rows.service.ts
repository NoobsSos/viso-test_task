import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Row } from 'src/schemas/Row.schema';
import { RowDto } from 'src/dto/CreateRow.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RowsService {
  constructor(@InjectModel(Row) private rowModel: typeof Row, private readonly userService: UserService) {}
  private changeCounter = 0;  // Лічильник змін


  async createOrUpdateRow(data: any): Promise<Row> {
    const value = Array.isArray(data.values) && data.values[0] ? data.values[0][0] : '';
    let newRow: Row | null = null;

    const existingRow = await this.rowModel.findOne({
      where: {
        rowNumber: data.row,
        columnNumber: data.column,
        sheetName: data.sheetName.toString(),
      },
    });
  
    if (existingRow) {
        await existingRow.update({ value });
    } else {
        newRow = await this.rowModel.create({
            rowNumber: data.row,
            columnNumber: data.column,
            value: value,
            sheetName: data.sheetName,
          }); 
    }
  
    
    this.changeCounter++;
    if (this.changeCounter % 10 == 0) {
      await this.userService.sendEveryUserEmail();
    }

    return newRow || existingRow;
  }

  async findAll(): Promise<Row[]> {
    return this.rowModel.findAll();
  }

  async findOneById(id: number): Promise<Row | null> {
    return this.rowModel.findByPk(id);
  }
}
