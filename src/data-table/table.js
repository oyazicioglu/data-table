import { Column } from './column.js';
import { Header } from './header.js';
import { Row } from './row.js';
import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';

export class Table {
    /** @type {Header[]} */
    #headers;

    /** @type {Row[]} */
    #rows;

    /** @type {Column[]} */
    #columns;

    /** @type {string} */
    uuid;

    /**
     * @param {Row[]} rows
     * @param {Column[]} columns
     * @param {Header[]} headers
     */
    constructor(rows, columns, headers) {
        this.uuid = uuid();
        this.#setRows(rows);
        this.#setColumns(columns);
        this.#setHeaders(headers);
    }

    /**
     * @param {Row[]} rows
     */
    #setRows(rows) {
        this.#rows = rows;
    }

    /**
     * @param {Column[]} columns
     */
    #setColumns(columns) {
        this.#columns = columns;
    }

    /**
     * @param {Header[]} headers
     */
    #setHeaders(headers) {
        this.#headers = headers;
    }

    getRows() {
        return this.#rows;
    }

    getColumns() {
        return this.#columns;
    }

    getHeaders() {
        return this.#headers;
    }

    /**
     * @param {Row} row
     */
    addRow(row) {
        if (!this.#rows) {
            this.#rows = [];
        }

        this.#rows.push(row);
    }

    /**
     * @param {Row} row
     */
    removeRow(row) {
        if (!this.#rows) {
            return;
        }

        const filteredRows = this.#rows.filter((r) => r !== row);
        this.#rows = filteredRows;
    }

    /**
     * @param {number} index
     */
    removeRowByIndex(index) {
        if (!this.#rows) {
            return;
        }

        const foundRow = this.#rows[index];
        if (foundRow) {
            this.#rows.splice(index, 1);
        }
    }

    /**
     * @param {Row} row
     * @returns {Row}
     */
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

    /**
     * @param {Column} column
     */
    addColumn(column) {
        if (!this.#columns) {
            this.#columns = [];
        }

        this.#columns.push(column);
    }

    /**
     * @param {Column} column
     */
    removeColumn(column) {
        if (!this.#columns) {
            return;
        }

        const filteredColumns = this.#columns.filter((r) => r !== column);
        this.#columns = filteredColumns;
    }

    /**
     * @param {number} index
     */
    removeColumnByIndex(index) {
        if (!this.#columns) {
            return;
        }

        const foundColumn = this.#columns[index];
        if (foundColumn) {
            this.#columns.splice(index, 1);
        }
    }

    /**
     * @param {Column} column
     * @returns {Column}
     */
    changeColumn(column) {
        if (!this.#columns) {
            return;
        }

        const foundColumn = this.#columns.indexOf(column);
        if (foundColumn === -1) {
            this.addColumn(column);
        }

        this.#columns[foundColumn] = column;
        return column;
    }

    getRowCount() {
        return this.#rows?.length;
    }

    getColumnCount() {
        return this.#columns?.length;
    }

    /**
     * @returns {Row}
     */
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
        return newColumn;
    }
}
