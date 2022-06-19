import { IColumn } from './IColumn';
import { IRow } from './IRow';

export interface ICell {
    set visibility(visible: boolean);
    set selectable(selectable: boolean);
    get visibility(): boolean;
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
