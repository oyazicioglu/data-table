import { v4 as uuid } from 'uuid';
import { ICell } from './ICell';
import { IColumn } from './IColumn';

export default class Column implements IColumn {
    private _uuid: string = undefined;
    private _name: string = undefined;

    constructor(private _cells: ICell[] = [], private _selectable = true, private _visibility = true, private _type: string = 'string') {
        this._uuid = uuid();
        this.cells = _cells;
        this.selectable = _selectable;
        this.visibility = _visibility;
        this.type = _type;
    }

    set visibility(visible: boolean) {
        this._visibility = visible;

        if (!this._cells) {
            return;
        }

        this._cells.forEach((cell) => {
            cell.visibility = visible;
        });
    }

    get selectable() {
        return this._selectable;
    }

    set selectable(selectable: boolean) {
        this._selectable = selectable;

        if (!this._cells) {
            return;
        }

        this._cells.forEach((cell) => {
            cell.selectable = selectable;
        });
    }

    get visibility() {
        return this._visibility;
    }

    set cells(cells: ICell[]) {
        if (!cells) {
            return;
        }

        this._cells = cells;
        this._cells.forEach((cell) => {
            cell.column = this;
        });
    }

    get cells() {
        return this._cells;
    }

    set name(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set type(type: string) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    get uuid() {
        return this._uuid;
    }

    addCell(cell: ICell) {
        if (!this._cells) {
            this._cells = [];
        }

        cell.column = this;
        this._cells.push(cell);
    }

    getCellByUUID(uuid: string) {
        if (!this._cells) {
            return undefined;
        }

        return this._cells.find((cell) => cell.uuid == uuid);
    }

    getCellByIndex(index: number) {
        if (!this._cells) {
            return undefined;
        }

        return this._cells[index];
    }

    toValueObject(): Object {
        const cells = this.cells?.map((cell) => {
            return cell.toValueObject();
        });

        return {
            uuid: this.uuid,
            selectable: this.selectable,
            visible: this.visibility,
            cells: cells,
            type: this.type,
            name: this.name,
        };
    }
}
