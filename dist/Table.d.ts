import { IColumn } from './IColumn';
import { IRow } from './IRow';
import { ITable } from './ITable';
export declare class Table implements ITable {
    private _rows;
    private _columns;
    private _uuid;
    constructor(_rows?: IRow[], _columns?: IColumn[]);
    set rows(rows: IRow[]);
    set columns(columns: IColumn[]);
    get rows(): IRow[];
    get columns(): IColumn[];
    get rowCount(): number;
    get columnCount(): number;
    get header(): IRow;
    get uuid(): string;
    addRow(row: IRow): void;
    removeRow(row: IRow): void;
    removeRowByIndex(index: number): void;
    changeRow(row: IRow): IRow;
    addColumn(column: IColumn): void;
    rowsFromJSON(rows: Array<Object>): void;
    columnsFromJSON(columns: Array<{
        selectable?: boolean;
        visible?: boolean;
        type: string;
        name?: string;
    }>): void;
    removeColumn(column: IColumn): void;
    removeColumnByIndex(index: number): void;
    changeColumn(column: IColumn): IColumn;
    createEmptyRow(): IRow;
    createEmptyColumn(): IColumn;
    createFromJSON(columns: Array<{
        selectable?: boolean;
        visible?: boolean;
        type: string;
        name?: string;
    }>, rows: Array<Object>): void;
}
