import { v4 as uuid } from 'uuid';
import { Column } from './column.js';
import { Row } from './row.js';

type ValueType = string | number | boolean | Date | null;

export class Cell {
    private _uuid: string = undefined;

    constructor(
        private _value: ValueType,
        private _row: Row,
        private _column: Column,
        private _selectable = true,
        private _visibility = true
    ) {
        this._uuid = uuid();
    }

    set visibility(visible: boolean) {
        this._visibility = visible;
    }

    set selectable(selectable: boolean) {
        this._selectable = selectable;
    }

    get visibility() {
        return this._visibility;
    }

    get selectable() {
        return this._selectable;
    }

    set value(value: ValueType) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set row(row: Row) {
        this._row = row;
    }

    get row() {
        return this._row;
    }

    set column(column) {
        this._column = column;
    }

    get column(): Column {
        return this._column;
    }

    get uuid() {
        return this._uuid;
    }

    toValueObject() {
        return {
            value: this.value,
            selectable: this.selectable,
            visible: this.visibility,
            row: this._row,
            column: this._column,
        };
    }
}
