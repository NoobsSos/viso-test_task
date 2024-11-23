import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Row extends Model<Row> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number; 

    @Column 
    rowNumber: number;    

    @Column
    columnNumber: number;

    @Column
    value: string;

    @Column
    sheetName: string;
}
