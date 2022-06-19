import { IColumn } from './IColumn';
import { IRow } from './IRow';

export interface ITable {
    get rows(): IRow[];
    set rows(rows: IRow[]);
    get columns(): IColumn[];
    set columns(columns: IColumn[]);
    get header(): IRow;
    get uuid(): string;
    get rowCount(): number;
    get columnCount(): number;
    addRow(row: IRow): void;
    removeRow(row: IRow): void;
    removeRowByIndex(index: number);
    changeRow(row: IRow): IRow;
    addColumn(column: IColumn);
    rowsFromJSON(rows: Array<Object>);
    columnsFromJSON(columns: Array<{ selectable?: boolean; visible?: boolean; type: string; name?: string }>);
    removeColumn(column: IColumn);
    removeColumnByIndex(index: number);
    changeColumn(column: IColumn): IColumn;
    createEmptyRow(): IRow;
    createEmptyColumn(): IColumn;
    createFromJSON(columns: Array<{ selectable?: boolean; visible?: boolean; type: string; name?: string }>, rows: Array<Object>);
}
