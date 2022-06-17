import { Column } from './column.js';
import { Header } from './header.js';
import { Row } from './row.js';
import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';

export class Table {
    /** @type {Header} */
    #header;

    /** @type {Row[]} */
    #rows;

    /** @type {Column[]} */
    #columns;

    /** @type {string} */
    uuid;

    /**
     * @param {Row[]} rows
     * @param {Column[]} columns
     * @param {Header} header
     */
    constructor(rows = [], columns = [], header = []) {
        this.uuid = uuid();
        this.#setRows(rows);
        this.#setColumns(columns);
        this.#setHeader(header);
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
     * @param {Header} header
     */
    #setHeader(header) {
        this.#header = header;
    }

    getRows() {
        return this.#rows;
    }

    getColumns() {
        return this.#columns;
    }

    getHeader() {
        return this.#header;
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

    /**
     *
     * @param {Object} json
     * @param {array} json.rows
     * @param {array} json.columns
     * @param {array} json.header
     */
    createFromJSON(json) {
        const { header, rows } = json;

        /** @type {Row[]} */
        let newRows = [];

        /** @type {Column[]} */
        let newColumns = [];

        /** @type {Header} */
        let newHeader = new Header();

        if (header?.length > 0) {
            header.map((value) => {
                const newColumn = new Column();
                newColumn.addCell(new Cell(value, null, newColumn));
                newColumns.push(newColumn);
                newHeader.addCell(new Cell(value, null, newColumn));
            });
        }

        if (rows?.length > 0) {
            newRows = rows.map((row) => {
                const newRow = new Row();
                for (let index = 0; index < Object.values(row).length; index++) {
                    const element = Object.values(row)[index];
                    const newCell = new Cell(element, newRow, newColumns[index]);
                    newRow.addCell(newCell);
                    newColumns[index].addCell(newCell);
                }

                return newRow;
            });
        }

        this.#setHeader(newHeader);
        this.#setRows(newRows);
        this.#setColumns(newColumns);
    }
}
