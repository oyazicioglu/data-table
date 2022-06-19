"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
var uuid_1 = require("uuid");
var IRow_1 = require("./IRow");
var Row = /** @class */ (function () {
    function Row(_cells, _visibility, _selectable, _type) {
        if (_cells === void 0) { _cells = []; }
        if (_visibility === void 0) { _visibility = true; }
        if (_selectable === void 0) { _selectable = true; }
        if (_type === void 0) { _type = IRow_1.RowType.ROW; }
        this._cells = _cells;
        this._visibility = _visibility;
        this._selectable = _selectable;
        this._type = _type;
        this.uuid = undefined;
        this.uuid = (0, uuid_1.v4)();
    }
    Object.defineProperty(Row.prototype, "visibility", {
        get: function () {
            return this._visibility;
        },
        set: function (visible) {
            this._visibility = visible;
            if (!this._cells) {
                return;
            }
            this._cells.forEach(function (cell) {
                cell.visibility = visible;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (selectable) {
            this._selectable = selectable;
            this._cells.forEach(function (cell) {
                cell.selectable = selectable;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "cells", {
        get: function () {
            return this._cells;
        },
        set: function (cells) {
            var _this = this;
            if (!cells) {
                return;
            }
            this._cells = cells;
            this._cells.forEach(function (cell) {
                cell.row = _this;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "isHeader", {
        get: function () {
            return this._type === IRow_1.RowType.HEADER;
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype.addCell = function (cell) {
        if (!this._cells) {
            this._cells = [];
        }
        cell.row = this;
        this._cells.push(cell);
    };
    Row.prototype.getCellByUUID = function (uuid) {
        if (!this._cells || !uuid) {
            return undefined;
        }
        return this._cells.find(function (cell) { return cell.uuid == uuid; });
    };
    Row.prototype.getCellByIndex = function (index) {
        if (!this._cells) {
            return undefined;
        }
        return this._cells[index];
    };
    Row.prototype.toValueObject = function () {
        var _a;
        var cells = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.map(function (cell) {
            return cell.toValueObject();
        });
        return {
            uuid: this.uuid,
            selectable: this.selectable,
            visibility: this.visibility,
            cells: cells,
            type: this.type,
        };
    };
    return Row;
}());
exports.Row = Row;
