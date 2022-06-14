import { Column } from './column.js';
import { Header } from './header.js';
import { Row } from './row.js';
import { v4 as uuid } from 'uuid';

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

        const indexOf = this.#rows.indexOf(index);
        if (index > -1) {
            this.#rows.splice(index, 1);
        }
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
    removeRowByIndex(index) {
        if (!this.#columns) {
            return;
        }

        const indexOf = this.#columns.indexOf(index);
        if (index > -1) {
            this.#columns.splice(index, 1);
        }
    }
}
