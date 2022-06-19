import { v4 as uuid } from 'uuid';
import { ICell } from './ICell';
import { IColumn } from './IColumn';
import { IRow } from './IRow';

export default class Cell implements ICell {
    private _uuid: string = undefined;

    constructor(
        private _value: string,
        private _row: IRow,
        private _column: IColumn,
        private _selectable = true,
        private _visibility = true
    ) {
        this._uuid = uuid();
    }

    get visibility() {
        return this._visibility;
    }

    set visibility(visible: boolean) {
        this._visibility = visible;
    }

    set selectable(selectable: boolean) {
        this._selectable = selectable;
    }

    get selectable() {
        return this._selectable;
    }

    set value(value: string) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set row(row: IRow) {
        this._row = row;
    }

    get row() {
        return this._row;
    }

    set column(column) {
        this._column = column;
    }

    get column(): IColumn {
        return this._column;
    }

    get uuid() {
        return this._uuid;
    }

    toValueObject(): Object {
        return {
            value: this.value,
            selectable: this.selectable,
            visible: this.visibility,
            row: this._row,
            column: this._column,
        };
    }
}
