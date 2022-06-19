"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var uuid_1 = require("uuid");
var Column = /** @class */ (function () {
    function Column(_cells, _selectable, _visibility, _type) {
        if (_cells === void 0) { _cells = []; }
        if (_selectable === void 0) { _selectable = true; }
        if (_visibility === void 0) { _visibility = true; }
        if (_type === void 0) { _type = 'string'; }
        this._cells = _cells;
        this._selectable = _selectable;
        this._visibility = _visibility;
        this._type = _type;
        this._uuid = undefined;
        this._name = undefined;
        this._uuid = (0, uuid_1.v4)();
        this.cells = _cells;
        this.selectable = _selectable;
        this.visibility = _visibility;
        this.type = _type;
    }
    Object.defineProperty(Column.prototype, "visibility", {
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
    Object.defineProperty(Column.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (selectable) {
            this._selectable = selectable;
            if (!this._cells) {
                return;
            }
            this._cells.forEach(function (cell) {
                cell.selectable = selectable;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "cells", {
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
                cell.column = _this;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: false,
        configurable: true
    });
    Column.prototype.addCell = function (cell) {
        if (!this._cells) {
            this._cells = [];
        }
        cell.column = this;
        this._cells.push(cell);
    };
    Column.prototype.getCellByUUID = function (uuid) {
        if (!this._cells) {
            return undefined;
        }
        return this._cells.find(function (cell) { return cell.uuid == uuid; });
    };
    Column.prototype.getCellByIndex = function (index) {
        if (!this._cells) {
            return undefined;
        }
        return this._cells[index];
    };
    Column.prototype.toValueObject = function () {
        var _a;
        var cells = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.map(function (cell) {
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
    };
    return Column;
}());
exports.Column = Column;
