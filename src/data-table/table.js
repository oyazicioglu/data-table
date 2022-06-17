import { Column } from './column.js';
import { Row } from './row.js';
import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';
import '../index.d.js';

export class Table {
    /** @type {Row[]} */
    #rows;

    /** @type {Column[]} */
    #columns;

    /** @type {string} */
    uuid;

    /**
     * @param {Row[]} rows
     * @param {Column[]} columns
     */
    constructor(rows = [], columns = []) {
        this.uuid = uuid();
        this.#setRows(rows);
        this.#setColumns(columns);
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

    getRows(includeHeader = false) {
        if (includeHeader) {
            return this.#rows;
        } else {
            return this.#rows.filter((row) => !row.isHeader() && row.isVisible() === true);
        }
    }

    getColumns() {
        return this.#columns.filter((column) => column.isVisible() === true);
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

    getRowCount(includeHidden = false) {
        if (includeHidden) {
            return this.#rows?.length;
        } else {
            return this.#rows?.filter((row) => row.isVisible() === true).length;
        }
    }

    getColumnCount(includeHidden = false) {
        if (includeHidden) {
            return this.#columns?.length;
        } else {
            return this.#columns?.filter((column) => column.isVisible() === true).length;
        }
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

    getHeader() {
        return this.#rows.find((row) => row.isHeader());
    }

    /**
     *
     * @param {Object} json
     * @param {array} json.rows
     * @param {ColumnDefs[]} json.columns
     */
    createFromJSON(json) {
        const { columns, rows } = json;

        /** @type {Row[]} */
        const newRows = [];

        /** @type {Column[]} */
        const newColumns = [];

        if (columns?.length > 0) {
            const headerRow = new Row();
            headerRow.setType('header');
            columns.map((column) => {
                const newColumn = new Column([], column.selectable, column.visible, column.type);
                newColumn.setName(column.name);
                const newCell = new Cell(column.name, headerRow, newColumn);
                newColumn.addCell(newCell);
                headerRow.addCell(newCell);
                newColumns.push(newColumn);
            });
            newRows.push(headerRow);
        }

        if (rows?.length > 0) {
            rows.map((row) => {
                const newRow = new Row();
                for (let index = 0; index < Object.values(row).length; index++) {
                    const element = Object.values(row)[index];
                    const newCell = new Cell(element, newRow, newColumns[index]);
                    newRow.addCell(newCell);
                    if (Array.isArray(newColumns) && newColumns[index]) {
                        newColumns[index].addCell(newCell);
                    }
                }

                newRows.push(newRow);
            });
        }

        this.#setRows(newRows);
        this.#setColumns(newColumns);
    }
}
