"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const uuid_1 = require("uuid");
class Cell {
    constructor(_value, _row, _column, _selectable = true, _visibility = true) {
        this._value = _value;
        this._row = _row;
        this._column = _column;
        this._selectable = _selectable;
        this._visibility = _visibility;
        this._uuid = undefined;
        this._uuid = (0, uuid_1.v4)();
        this.column = _column;
        this.row = _row;
        this.value = _value;
        this.visibility = _visibility;
        this.selectable = _selectable;
    }
    set visibility(visible) {
        this._visibility = visible;
    }
    set selectable(selectable) {
        this._selectable = selectable;
    }
    get visibility() {
        return this._visibility;
    }
    get selectable() {
        return this._selectable;
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set row(row) {
        this._row = row;
    }
    get row() {
        return this._row;
    }
    set column(column) {
        this._column = column;
    }
    get column() {
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
exports.Cell = Cell;
