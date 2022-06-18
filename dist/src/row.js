"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = exports.RowType = void 0;
const uuid_1 = require("uuid");
var RowType;
(function (RowType) {
    RowType[RowType["ROW"] = 0] = "ROW";
    RowType[RowType["HEADER"] = 1] = "HEADER";
})(RowType = exports.RowType || (exports.RowType = {}));
class Row {
    constructor(_cells = [], _visibility = true, _selectable = true, _type = RowType.ROW) {
        this._cells = _cells;
        this._visibility = _visibility;
        this._selectable = _selectable;
        this._type = _type;
        this.uuid = undefined;
        this.uuid = (0, uuid_1.v4)();
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
    set cells(cells) {
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
    addCell(cell) {
        if (!this._cells) {
            this._cells = [];
        }
        cell.row = this;
        this._cells.push(cell);
    }
    getCellByUUID(uuid) {
        if (!this._cells || !uuid) {
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
    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    get header() {
        return this._type === RowType.HEADER;
    }
    toValueObject() {
        var _a;
        const cells = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.map((cell) => {
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
exports.Row = Row;
