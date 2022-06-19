import { ICell } from './ICell';

export enum RowType {
    ROW,
    HEADER,
}

export interface IRow {
    get cells(): ICell[];
    set cells(cells: ICell[]);
    get visibility(): boolean;
    set visibility(visible: boolean);
    get selectable(): boolean;
    set selectable(selectable: boolean);
    get type(): RowType;
    set type(type: RowType);
    get isHeader(): boolean;
    addCell(cell: ICell): void;
    getCellByUUID(uuid: string): ICell;
    getCellByIndex(index: number): ICell;
    toValueObject(): Object;
}
