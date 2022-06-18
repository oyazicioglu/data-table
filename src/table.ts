import { CellType, Column } from './column';
import { Row, RowType } from './row';
import { v4 as uuid } from 'uuid';
import { Cell } from './cell';

export class Table {
    private _uuid: string = undefined;

    constructor(private _rows: Row[] = [], private _columns: Column[] = []) {
        this._uuid = uuid();
    }

    set rows(rows: Row[]) {
        if (!rows && !Array.isArray(rows)) {
            return;
        }

        this._rows = rows;
    }

    set columns(columns: Column[]) {
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
        return this._rows?.filter((row) => row.visibility === true).length;
    }

    get columnCount() {
        return this._columns?.filter((column) => column.visibility === true).length;
    }

    get header() {
        return this._rows.find((row) => row.type === RowType.HEADER);
    }

    get uuid() {
        return this._uuid;
    }

    addRow(row: Row) {
        if (!this._rows) {
            this._rows = [];
        }

        this._rows.push(row);
    }

    removeRow(row: Row) {
        if (!this._rows) {
            return;
        }

        const filteredRows = this._rows.filter((r) => r !== row);
        this._rows = filteredRows;
    }

    removeRowByIndex(index: number) {
        if (!this._rows) {
            return;
        }

        const foundRow = this._rows[index];
        if (foundRow) {
            this._rows.splice(index, 1);
        }
    }

    changeRow(row: Row): Row {
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

    addColumn(column: Column) {
        if (!this._columns) {
            this._columns = [];
        }

        this._columns.push(column);
    }

    rowsFromJSON(rows: Array<Object>) {
        if (rows?.length <= 0) {
            return;
        }

        rows.map((row) => {
            const newRow = new Row();
            const columns = this.columns;
            for (let index = 0; index < Object.values(row).length; index++) {
                const column = columns[index];
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

    columnsFromJSON(columns: Array<{ selectable?: boolean; visible?: boolean; type: CellType; name?: string }>) {
        if (columns?.length <= 0) {
            return;
        }

        const headerRow = new Row();
        headerRow.type = RowType.HEADER;
        columns.map((column) => {
            const newColumn = new Column([], column.selectable, column.visible, column.type);
            newColumn.name = column.name;
            const newCell = new Cell(column.name, headerRow, newColumn, column.selectable, column.visible);
            newColumn.addCell(newCell);
            headerRow.addCell(newCell);
            this.addColumn(newColumn);
        });

        this.addRow(headerRow);
    }

    removeColumn(column: Column) {
        if (!this._columns) {
            return;
        }

        const filteredColumns = this._columns.filter((r) => r !== column);
        this._columns = filteredColumns;
    }

    removeColumnByIndex(index: number) {
        if (!this._columns) {
            return;
        }

        const foundColumn = this._columns[index];
        if (foundColumn) {
            this._columns.splice(index, 1);
        }
    }

    changeColumn(column: Column): Column {
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

    createEmptyRow(): Row {
        const newRow = new Row();

        if (!this._columns) {
            this._columns = [];
        }

        this._columns.forEach((column) => {
            newRow.addCell(new Cell('', newRow, column));
        });

        if (!this._rows) {
            this._rows = [];
        }

        this._rows.push(newRow);
        return newRow;
    }

    createEmptyColumn(): Column {
        const newColumn = new Column();

        if (!this._rows) {
            this._rows = [];
        }

        this._rows.forEach((row) => {
            newColumn.addCell(new Cell('', row, newColumn));
        });

        if (!this._columns) {
            this._columns = [];
        }

        this._columns.push(newColumn);
        return newColumn;
    }

    createFromJSON(columns: Array<{ selectable?: boolean; visible?: boolean; type: CellType; name?: string }>, rows: Array<Object>) {
        this.columnsFromJSON(columns);
        this.rowsFromJSON(rows);
    }
}
