"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const column_1 = require("./column");
const row_1 = require("./row");
const uuid_1 = require("uuid");
const cell_1 = require("./cell");
class Table {
    constructor(_rows = [], _columns = []) {
        this._rows = _rows;
        this._columns = _columns;
        this._uuid = undefined;
        this._uuid = (0, uuid_1.v4)();
    }
    set rows(rows) {
        if (!rows && !Array.isArray(rows)) {
            return;
        }
        this._rows = rows;
    }
    set columns(columns) {
        if (!columns && !Array.isArray(columns)) {
            return;
        }
        this._columns = columns;
    }
    get rows() {
        const visibleRows = this._rows.filter((row) => row.visibility === true);
        return visibleRows.filter((row) => row.cells.filter((c) => c.visibility === true));
    }
    get columns() {
        const visibleColumns = this._columns.filter((column) => column.visibility === true);
        return visibleColumns.filter((column) => column.cells.filter((cell) => cell.visibility === true));
    }
    get rowCount() {
        var _a;
        return (_a = this._rows) === null || _a === void 0 ? void 0 : _a.filter((row) => row.visibility === true).length;
    }
    get columnCount() {
        var _a;
        return (_a = this._columns) === null || _a === void 0 ? void 0 : _a.filter((column) => column.visibility === true).length;
    }
    get header() {
        return this._rows.find((row) => row.type === row_1.RowType.HEADER);
    }
    get uuid() {
        return this._uuid;
    }
    addRow(row) {
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.push(row);
    }
    removeRow(row) {
        if (!this._rows) {
            return;
        }
        const filteredRows = this._rows.filter((r) => r !== row);
        this._rows = filteredRows;
    }
    removeRowByIndex(index) {
        if (!this._rows) {
            return;
        }
        const foundRow = this._rows[index];
        if (foundRow) {
            this._rows.splice(index, 1);
        }
    }
    changeRow(row) {
        if (!this._rows) {
            return;
        }
        const foundRow = this._rows.indexOf(row);
        if (foundRow === -1) {
            this.addRow(row);
        }
        this._rows[foundRow] = row;
        return row;
    }
    addColumn(column) {
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.push(column);
    }
    rowsFromJSON(rows) {
        if ((rows === null || rows === void 0 ? void 0 : rows.length) <= 0) {
            return;
        }
        rows.map((row) => {
            const newRow = new row_1.Row();
            const columns = this.columns;
            for (let index = 0; index < Object.values(row).length; index++) {
                const column = columns[index];
                const element = Object.values(row)[index];
                const newCell = new cell_1.Cell(element, newRow, columns[index], !!column.selectable, !!column.visibility);
                newRow.addCell(newCell);
                if (Array.isArray(columns) && columns[index]) {
                    columns[index].addCell(newCell);
                }
            }
            this.addRow(newRow);
        });
    }
    columnsFromJSON(columns) {
        if ((columns === null || columns === void 0 ? void 0 : columns.length) <= 0) {
            return;
        }
        const headerRow = new row_1.Row();
        headerRow.type = row_1.RowType.HEADER;
        columns.map((column) => {
            const newColumn = new column_1.Column([], column.selectable, column.visible, column.type);
            newColumn.name = column.name;
            const newCell = new cell_1.Cell(column.name, headerRow, newColumn, column.selectable, column.visible);
            newColumn.addCell(newCell);
            headerRow.addCell(newCell);
            this.addColumn(newColumn);
        });
        this.addRow(headerRow);
    }
    removeColumn(column) {
        if (!this._columns) {
            return;
        }
        const filteredColumns = this._columns.filter((r) => r !== column);
        this._columns = filteredColumns;
    }
    removeColumnByIndex(index) {
        if (!this._columns) {
            return;
        }
        const foundColumn = this._columns[index];
        if (foundColumn) {
            this._columns.splice(index, 1);
        }
    }
    changeColumn(column) {
        if (!this._columns) {
            return;
        }
        const foundColumn = this._columns.indexOf(column);
        if (foundColumn === -1) {
            this.addColumn(column);
        }
        this._columns[foundColumn] = column;
        return column;
    }
    createEmptyRow() {
        const newRow = new row_1.Row();
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.forEach((column) => {
            newRow.addCell(new cell_1.Cell('', newRow, column));
        });
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.push(newRow);
        return newRow;
    }
    createEmptyColumn() {
        const newColumn = new column_1.Column();
        if (!this._rows) {
            this._rows = [];
        }
        this._rows.forEach((row) => {
            newColumn.addCell(new cell_1.Cell('', row, newColumn));
        });
        if (!this._columns) {
            this._columns = [];
        }
        this._columns.push(newColumn);
        return newColumn;
    }
    createFromJSON(columns, rows) {
        this.columnsFromJSON(columns);
        this.rowsFromJSON(rows);
    }
}
exports.Table = Table;
