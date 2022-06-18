"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
class Column {
    constructor(_cells = [], _selectable = true, _visibility = true, _type = 'string') {
        this._cells = _cells;
        this._selectable = _selectable;
        this._visibility = _visibility;
        this._type = _type;
        this._uuid = undefined;
        this._name = undefined;
        this._uuid = (0, uuid_1.v4)();
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
    get selectable() {
        return this._selectable;
    }
    set selectable(selectable) {
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
    set cells(cells) {
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
    addCell(cell) {
        if (!this._cells) {
            this._cells = [];
        }
        cell.column = this;
        this._cells.push(cell);
    }
    getCellByUUID(uuid) {
        if (!this._cells) {
            return undefined;
        }
        return this._cells.find((cell) => cell.uuid == uuid);
    }
    getCellByIndex(index) {
        if (!this._cells) {
            return undefined;
        }
        return this._cells[index];
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    get uuid() {
        return this._uuid;
    }
    toValueObject() {
        var _a;
        const cells = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.map((cell) => {
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
exports.Column = Column;
