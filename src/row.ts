import { v4 as uuid } from 'uuid';
import { Cell } from './cell';

export enum RowType {
    ROW,
    HEADER,
}

export class Row {
    private uuid: string = undefined;

    constructor(
        private _cells: Cell[] = [],
        private _visibility: boolean = true,
        private _selectable: boolean = true,
        private _type: RowType = RowType.ROW
    ) {
        this.uuid = uuid();
    }

    set visibility(visible) {
        this._visibility = visible;

        if (!this._cells) {
            return;
        }

        this._cells.forEach((cell) => {
            cell.visibility = visible;
        });
    }

    set selectable(selectable) {
        this._selectable = selectable;

        this._cells.forEach((cell) => {
            cell.selectable = selectable;
        });
    }

    get visibility() {
        return this._visibility;
    }

    get selectable() {
        return this._selectable;
    }

    set cells(cells: Cell[]) {
        if (!cells) {
            return;
        }

        this._cells = cells;
        this._cells.forEach((cell) => {
            cell.row = this;
        });
    }

    get cells() {
        return this._cells;
    }

    addCell(cell: Cell) {
        if (!this._cells) {
            this._cells = [];
        }

        cell.row = this;
        this._cells.push(cell);
    }

    getCellByUUID(uuid: string) {
        if (!this._cells || !uuid) {
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

    set type(type: RowType) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    get header() {
        return this._type === RowType.HEADER;
    }

    toValueObject() {
        const cells = this.cells?.map((cell) => {
            return cell.toValueObject();
        });

        return {
            uuid: this.uuid,
            selectable: this.selectable,
            visibility: this.visibility,
            cells,
            type: this.type,
        };
    }
}
