import { ICell } from './ICell';
export interface IColumn {
    set visibility(visible: boolean);
    set selectable(selectable: boolean);
    get visibility(): boolean;
    get selectable(): boolean;
    get uuid(): string;
    get name(): string;
    set name(name: string);
    get type(): string;
    set type(type: string);
    get cells(): ICell[];
    set cells(cells: ICell[]);
    addCell(cell: ICell): void;
    getCellByUUID(uuid: string): ICell;
    getCellByIndex(index: number): ICell;
    toValueObject(): Object;
}
