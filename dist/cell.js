"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var uuid_1 = require("uuid");
var Cell = /** @class */ (function () {
    function Cell(_value, _row, _column, _selectable, _visibility) {
        if (_selectable === void 0) { _selectable = true; }
        if (_visibility === void 0) { _visibility = true; }
        this._value = _value;
        this._row = _row;
        this._column = _column;
        this._selectable = _selectable;
        this._visibility = _visibility;
        this._uuid = undefined;
        this._uuid = (0, uuid_1.v4)();
    }
    Object.defineProperty(Cell.prototype, "visibility", {
        get: function () {
            return this._visibility;
        },
        set: function (visible) {
            this._visibility = visible;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (selectable) {
            this._selectable = selectable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (row) {
            this._row = row;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.toValueObject = function () {
        return {
            value: this.value,
            selectable: this.selectable,
            visible: this.visibility,
            row: this._row,
            column: this._column,
        };
    };
    return Cell;
}());
exports.Cell = Cell;
