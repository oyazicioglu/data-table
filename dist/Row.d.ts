import { ICell } from './ICell';
import { IRow, RowType } from './IRow';
export declare class Row implements IRow {
    private _cells;
    private _visibility;
    private _selectable;
    private _type;
    private uuid;
    constructor(_cells?: ICell[], _visibility?: boolean, _selectable?: boolean, _type?: RowType);
    set visibility(visible: boolean);
    set selectable(selectable: boolean);
    get visibility(): boolean;
    get selectable(): boolean;
    set cells(cells: ICell[]);
    get cells(): ICell[];
    set type(type: RowType);
    get type(): RowType;
    get isHeader(): boolean;
    addCell(cell: ICell): void;
    getCellByUUID(uuid: string): ICell;
    getCellByIndex(index: number): ICell;
    toValueObject(): Object;
}
