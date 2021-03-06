import Cell from './Cell.js';
import Column from './Column.js';
import { Subject } from './lib/Subject.js';
import { uuid } from './lib/uuid.js';
import Row from './Row.js';

export default class DataTable {
    #uuid = undefined;
    /** @type {Row[]} */
    #rows;
    /** @type {Column[]} */
    #columns;

    #eventSubject = new Subject();

    /** @type {Row[]} */
    #result = [];

    /**
     * @param {Row[]} _rows
     * @param {Column[]} _columns
     */
    constructor(_rows = [], _columns = []) {
        this.#uuid = uuid();
        this.rows = _rows;
        this.columns = _columns;

        this.#emitOnHeaderChanged(this.header);
        this.#emitOnColumnsChanged(this.columns);
        this.#emitOnRowsChanged(this.rows);
    }

    /** @param {Row[]} */
    set rows(rows) {
        if (!rows && !Array.isArray(rows)) {
            return;
        }

        this.#rows = rows;
    }

    /** @param {Column[]} */
    set columns(columns) {
        if (!columns && !Array.isArray(columns)) {
            return;
        }

        this.#columns = columns;
    }

    /** @returns {Row[]} */
    get rows() {
        if (!this.#rows) {
            return [];
        }

        const visibleRows = this.#rows?.filter((row) => row.visibility === true && row.type !== 'HEADER');
        if (!visibleRows) {
            return [];
        }

        return visibleRows?.filter((row) => row.cells.filter((c) => c.visibility === true));
    }

    /** @returns {Column[]} */
    get columns() {
        if (!this.#columns) {
            return [];
        }

        const visibleColumns = this.#columns?.filter((column) => column.visibility === true);
        if (!visibleColumns) {
            return [];
        }
        return visibleColumns?.filter((column) => column.cells?.filter((cell) => cell.visibility === true));
    }

    /** @returns {Row[]} */
    get allRows() {
        return this.#rows;
    }

    /** @returns {Column[]} */
    get allColumns() {
        return this.#columns;
    }

    get rowCount() {
        return this.#rows?.filter((row) => row.visibility === true).length;
    }

    get columnCount() {
        return this.#columns?.filter((column) => column.visibility === true).length;
    }

    /** @returns {Row} */
    get header() {
        return this.#rows.find((row) => row.isHeader && row.cells.filter((c) => c.visibility === true));
    }

    get uuid() {
        return this.#uuid;
    }

    /** @param {Row} row  */
    addRow(row) {
        if (!this.#rows) {
            this.#rows = [];
        }

        this.#rows.push(row);
    }

    /** @param {Row} row  */
    removeRow(row) {
        if (!this.#rows) {
            return;
        }

        const filteredRows = this.#rows.filter((r) => r !== row);
        this.#rows = filteredRows;
    }

    /** @param {number} index  */
    removeRowByIndex(index) {
        if (!this.#rows) {
            return;
        }

        const foundRow = this.#rows[index];
        if (foundRow) {
            this.#rows.splice(index, 1);
        }
    }

    /** @param {Row} row  */
    changeRow(row) {
        if (!this.#rows) {
            return;
        }

        const foundRow = this.#rows.indexOf(row);
        if (foundRow === -1) {
            this.addRow(row);
        }

        this.#rows[foundRow] = row;
        return row;
    }

    /** @param {Column} column  */
    addColumn(column) {
        if (!this.#columns) {
            this.#columns = [];
        }

        this.#columns.push(column);
    }

    /** @param {Object[]} rows  */
    rowsFromJSON(rows) {
        if (rows?.length <= 0) {
            return;
        }

        rows.map((row) => {
            const newRow = new Row();
            const columns = this.allColumns;
            for (let index = 0; index < Object.values(row).length; index++) {
                const column = columns[index];
                if (!column) {
                    this.addColumn(new Column([]));
                }
                const element = Object.values(row)[index];
                const newCell = new Cell(element, newRow, columns[index], !!column.selectable, !!column.visibility);
                newRow.addCell(newCell);
                if (Array.isArray(columns) && columns[index]) {
                    columns[index].addCell(newCell);
                }
            }

            this.addRow(newRow);
        });
    }

    /** @param {Object[]} columns  */
    columnsFromJSON(columns) {
        if (columns?.length <= 0) {
            return;
        }

        const headerRow = new Row();
        headerRow.type = 'HEADER';
        columns.map((column) => {
            const newColumn = new Column([], column.selectable, column.visible);
            newColumn.name = column.name;
            const newCell = new Cell(column.name, headerRow, newColumn, column.selectable, column.visible);
            newColumn.addCell(newCell);
            headerRow.addCell(newCell);
            this.addColumn(newColumn);
        });

        this.addRow(headerRow);
    }

    /** @param {Column} column  */
    removeColumn(column) {
        if (!this.#columns) {
            return;
        }

        const filteredColumns = this.#columns.filter((r) => r !== column);
        this.#columns = filteredColumns;

        this.#emitOnColumnsChanged(this.columns);
    }

    /** @param {number} index  */
    removeColumnByIndex(index) {
        if (!this.#columns) {
            return;
        }

        const foundColumn = this.#columns[index];
        if (foundColumn) {
            this.#columns.splice(index, 1);
        }

        this.#emitOnColumnsChanged(this.columns);
    }

    /** @param {Column} column  */
    changeColumn(column) {
        if (!this.#columns) {
            return;
        }

        const foundColumn = this.#columns.indexOf(column);
        if (foundColumn === -1) {
            this.addColumn(column);
        }

        this.#columns[foundColumn] = column;

        this.#emitOnColumnsChanged(this.columns);
    }

    /** @returns {Row} */
    createEmptyRow() {
        const newRow = new Row();

        if (!this.#columns) {
            this.#columns = [];
        }

        this.#columns.forEach((column) => {
            newRow.addCell(new Cell('', newRow, column));
        });

        if (!this.#rows) {
            this.#rows = [];
        }

        this.#rows.push(newRow);
        return newRow;
    }

    /** @returns {Column} */
    createEmptyColumn() {
        const newColumn = new Column();

        if (!this.#rows) {
            this.#rows = [];
        }

        this.#rows.forEach((row) => {
            newColumn.addCell(new Cell('', row, newColumn));
        });

        if (!this.#columns) {
            this.#columns = [];
        }

        this.#columns.push(newColumn);
        this.#emitOnColumnsChanged(this.columns);
        return newColumn;
    }

    /** @param {Column} column  */
    hideColumn(column) {
        if (!column) {
            return;
        }

        const foundColumnIndex = this.#columns.findIndex((c) => c === column);
        if (!foundColumnIndex) {
            return;
        }

        this.#columns[foundColumnIndex].visibility = false;
        this.#emitOnHeaderChanged(this.header);
        this.#emitOnUpdate(this.rows);
    }

    /**
     *  @param {Object[]} columns
     * @param {Object[]} rows
     */
    createFromJSON(columns, rows) {
        this.columnsFromJSON(columns);
        this.rowsFromJSON(rows);
    }

    /**
     *
     * @param {string | string[]} value
     * @returns {Row[]}
     */
    globalSearch(value) {
        if (!value || !this.rows) {
            [];
        }

        const rows = this.rows.filter((row) => {
            return row.search(value);
        });

        this.#emitOnRowsChanged(rows);
    }

    /**
     * @param {Column[]} columns
     * @param {string | number} value
     */
    searchInColumns(columns, value) {
        if (!columns || !this.columns || !Array.isArray(columns) || columns.length <= 0) {
            return;
        }

        return this.columns.some((column) => column.search(value));
    }

    onUpdate(callback) {
        this.#eventSubject.subscribe('onColumnsChanged', callback);
    }

    #emitOnUpdate(updateResult) {
        this.#eventSubject.notify('onColumnsChanged', updateResult);
    }

    onHeaderChanged(callback) {
        this.#eventSubject.subscribe('onHeaderChanged', callback);
    }

    #emitOnHeaderChanged(header) {
        this.#eventSubject.notify('onHeaderChanged', header);
    }

    onRowsChanged(callback) {
        this.#eventSubject.subscribe('onRowsChanged', callback);
    }

    #emitOnRowsChanged(rows) {
        this.#eventSubject.notify('onRowsChanged', rows);
    }

    onColumnsChanged(callback) {
        this.#eventSubject.subscribe('onColumnsChanged', callback);
    }

    #emitOnColumnsChanged(columns) {
        this.#eventSubject.notify('onColumnsChanged', columns);
    }
}
