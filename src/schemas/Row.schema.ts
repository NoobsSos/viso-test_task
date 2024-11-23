import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Row extends Model<Row> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number; 

    @Column({ unique: true }) 
    rowNumber: number;    

    @Column({ unique: true })
    columnNumber: number;

    @Column
    value: string;

    @Column
    sheetName: string;
}
