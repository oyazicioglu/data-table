"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
var uuid_1 = require("uuid");
var Cell_1 = require("./Cell");
var Column_1 = require("./Column");
var IRow_1 = require("./IRow");
var Row_1 = require("./Row");
var Table = /** @class */ (function () {
    function Table(_rows, _columns) {
        if (_rows === void 0) { _rows = []; }
        if (_columns === void 0) { _columns = []; }
        this._rows = _rows;
        this._columns = _columns;
        this._uuid = undefined;
        this._uuid = (0, uuid_1.v4)();
    }
    Object.defineProperty(Table.prototype, "rows", {
        get: function () {
            var visibleRows = this._rows.filter(function (row) { return row.visibility === true; });
            return visibleRows.filter(function (row) { return row.cells.filter(function (c) { return c.visibility === true; }); });
        },
        set: function (rows) {
            if (!rows && !Array.isArray(rows)) {
                return;
            }
            this._rows = rows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            var visibleColumns = this._columns.filter(function (column) { return column.visibility === true; });
            return visibleColumns.filter(function (column) { return column.cells.filter(function (cell) { return cell.visibility === true; }); });
        },
        set: function (columns) {
            if (!columns && !Array.isArray(columns)) {
                return;
            }
            this._columns = columns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "rowCount", {
        get: function () {
            var _a;
            return (_a = this._rows) === null || _a === void 0 ? void 0 : _a.filter(function (row) { return row.visibility === true; }).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columnCount", {
        get: function () {
            var _a;
            return (_a = this._columns) === null || _a === void 0 ? void 0 : _a.filter(function (column) { return column.visibility === true; }).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "header", {
        get: function () {
            return this._rows.find(function (row) { return row.type === IRow_1.RowType.HEADER; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: false,
        configurable: true
    });
    Table.prototype.addRow = function (row) {
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.push(row);
    };
    Table.prototype.removeRow = function (row) {
        if (!this._rows) {
            return;
        }
        var filteredRows = this._rows.filter(function (r) { return r !== row; });
        this._rows = filteredRows;
    };
    Table.prototype.removeRowByIndex = function (index) {
        if (!this._rows) {
            return;
        }
        var foundRow = this._rows[index];
        if (foundRow) {
            this._rows.splice(index, 1);
        }
    };
    Table.prototype.changeRow = function (row) {
        if (!this._rows) {
            return;
        }
        var foundRow = this._rows.indexOf(row);
        if (foundRow === -1) {
            this.addRow(row);
        }
        this._rows[foundRow] = row;
        return row;
    };
    Table.prototype.addColumn = function (column) {
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.push(column);
    };
    Table.prototype.rowsFromJSON = function (rows) {
        var _this = this;
        if ((rows === null || rows === void 0 ? void 0 : rows.length) <= 0) {
            return;
        }
        rows.map(function (row) {
            var newRow = new Row_1.Row();
            var columns = _this.columns;
            for (var index = 0; index < Object.values(row).length; index++) {
                var column = columns[index];
                var element = Object.values(row)[index];
                var newCell = new Cell_1.Cell(element, newRow, columns[index], !!column.selectable, !!column.visibility);
                newRow.addCell(newCell);
                if (Array.isArray(columns) && columns[index]) {
                    columns[index].addCell(newCell);
                }
            }
            _this.addRow(newRow);
        });
    };
    Table.prototype.columnsFromJSON = function (columns) {
        var _this = this;
        if ((columns === null || columns === void 0 ? void 0 : columns.length) <= 0) {
            return;
        }
        var headerRow = new Row_1.Row();
        headerRow.type = IRow_1.RowType.HEADER;
        columns.map(function (column) {
            var newColumn = new Column_1.Column([], column.selectable, column.visible);
            newColumn.name = column.name;
            var newCell = new Cell_1.Cell(column.name, headerRow, newColumn, column.selectable, column.visible);
            newColumn.addCell(newCell);
            headerRow.addCell(newCell);
            _this.addColumn(newColumn);
        });
        this.addRow(headerRow);
    };
    Table.prototype.removeColumn = function (column) {
        if (!this._columns) {
            return;
        }
        var filteredColumns = this._columns.filter(function (r) { return r !== column; });
        this._columns = filteredColumns;
    };
    Table.prototype.removeColumnByIndex = function (index) {
        if (!this._columns) {
            return;
        }
        var foundColumn = this._columns[index];
        if (foundColumn) {
            this._columns.splice(index, 1);
        }
    };
    Table.prototype.changeColumn = function (column) {
        if (!this._columns) {
            return;
        }
        var foundColumn = this._columns.indexOf(column);
        if (foundColumn === -1) {
            this.addColumn(column);
        }
        this._columns[foundColumn] = column;
        return column;
    };
    Table.prototype.createEmptyRow = function () {
        var newRow = new Row_1.Row();
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.forEach(function (column) {
            newRow.addCell(new Cell_1.Cell('', newRow, column));
        });
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.push(newRow);
        return newRow;
    };
    Table.prototype.createEmptyColumn = function () {
        var newColumn = new Column_1.Column();
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.forEach(function (row) {
            newColumn.addCell(new Cell_1.Cell('', row, newColumn));
        });
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.push(newColumn);
        return newColumn;
    };
    Table.prototype.createFromJSON = function (columns, rows) {
        this.columnsFromJSON(columns);
        this.rowsFromJSON(rows);
    };
    return Table;
}());
exports.Table = Table;
