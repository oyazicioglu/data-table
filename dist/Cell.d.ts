import { ICell } from './ICell';
import { IColumn } from './IColumn';
import { IRow } from './IRow';
export declare class Cell implements ICell {
    private _value;
    private _row;
    private _column;
    private _selectable;
    private _visibility;
    private _uuid;
    constructor(_value: string, _row: IRow, _column: IColumn, _selectable?: boolean, _visibility?: boolean);
    get visibility(): boolean;
    set visibility(visible: boolean);
    set selectable(selectable: boolean);
    get selectable(): boolean;
    set value(value: string);
    get value(): string;
    set row(row: IRow);
    get row(): IRow;
    set column(column: IColumn);
    get column(): IColumn;
    get uuid(): string;
    toValueObject(): Object;
}
