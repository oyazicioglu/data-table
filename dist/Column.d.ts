import { ICell } from './ICell';
import { IColumn } from './IColumn';
export declare class Column implements IColumn {
    private _cells;
    private _selectable;
    private _visibility;
    private _type;
    private _uuid;
    private _name;
    constructor(_cells?: ICell[], _selectable?: boolean, _visibility?: boolean, _type?: string);
    set visibility(visible: boolean);
    get selectable(): boolean;
    set selectable(selectable: boolean);
    get visibility(): boolean;
    set cells(cells: ICell[]);
    get cells(): ICell[];
    set name(name: string);
    get name(): string;
    set type(type: string);
    get type(): string;
    get uuid(): string;
    addCell(cell: ICell): void;
    getCellByUUID(uuid: string): ICell;
    getCellByIndex(index: number): ICell;
    toValueObject(): Object;
}
