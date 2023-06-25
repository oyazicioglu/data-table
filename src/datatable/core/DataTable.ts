import { IRow, IColumn, Row, SortDirection, Sortable } from '../../index.js';
import {
    onFilteredRowsChanged,
    onRowsSorted,
    onFilterCriteriaChanged,
    onSearchCriteriaChanged,
    onReset,
} from './GlobalEvents.js';
import { IDataTable, DataTableOptions } from './IDataTable.js';

export class DataTable implements IDataTable {
    private _options: DataTableOptions;
    public get options(): DataTableOptions {
        return this._options;
    }
    public set options(v: DataTableOptions) {
        this._options = v;
    }

    private _rows: IRow[] = [];
    public get rows(): IRow[] {
        return this._rows;
    }
    public set rows(v: IRow[]) {
        this._rows = v;
    }

    private _columns: IColumn[] = [];
    public get columns(): IColumn[] {
        return this._columns;
    }
    public set columns(v: IColumn[]) {
        this._columns = v;
    }

    private _filteredRows: IRow[] = [];
    public get filteredRows(): IRow[] {
        return this._filteredRows;
    }
    public set filteredRows(v: IRow[]) {
        this._filteredRows = v;
        onFilteredRowsChanged.Notify(v);
    }

    private _globalSearchCriteria: string = '';
    public get globalSearchCriteria(): string {
        return this._globalSearchCriteria;
    }
    public set globalSearchCriteria(v: string) {
        if (this._globalSearchCriteria !== v) {
            this._globalSearchCriteria = v;
            this.globalSearch();
        } else {
            this.rowSearch();
            this.columnSearch();
        }
    }

    private _data: Object[] = [];
    public get data(): Object[] {
        return this._data;
    }
    public set data(v: Object[]) {
        if (this._data === v) {
            return;
        }
        this.reset();
        this._data = v;
        this.fromJson(v);
    }

    constructor(options?: DataTableOptions) {
        if (options) {
            this._options = options;
        } else {
            this._options = {
                hasGlobalSearch: false,
                hasPagination: false,
            };
        }

        onRowsSorted.Subscribe((sort) => {
            this.sort(sort.direction, sort.index, sort.sorter);
        });

        onFilterCriteriaChanged.Subscribe((data) => {
            this.globalSearch();
        });

        onSearchCriteriaChanged.Subscribe((data) => {
            this.globalSearch();
        });

        if (options) {
            this.options = options;
        }

        this.columns = [];
        this.rows = [];
    }

    reset() {
        this.filteredRows = [];
        this.globalSearchCriteria = '';
        this.columns.forEach((column) => {
            column.reset();
        });
        onReset.Notify(this.rows);
    }

    globalSearch() {
        if (this.globalSearchCriteria === '') {
            this.filteredRows = this.rows;
            this.columnSearch();
            return;
        }

        this.rowSearch();
        this.columnSearch();
    }

    private rowSearch() {
        this.filteredRows = this.rows.filter((row) =>
            row.search(this.globalSearchCriteria, this.columns)
        );
    }

    private fromJson(data: Object[]) {
        let rows: IRow[] = [];
        data.forEach((datum, index) => {
            let values: string[] = [];
            for (const [key, value] of Object.entries(datum)) {
                values.push(value);
            }

            const newRow = new Row(values, {
                selectable: true,
                visible: true,
            });
            rows.push(newRow);
        });

        this.filteredRows = rows;
        this.rows = rows;
    }

    columnSearch() {
        let foundRows = [...this.filteredRows];
        this.columns.forEach((column) => {
            foundRows = column.search(foundRows);
        });

        this.filteredRows = Array.from(new Set(foundRows));
    }

    sort(direction: SortDirection, columnIndex: number, sorter: Sortable) {
        if (sorter) {
            this.filteredRows = sorter.sort(direction, columnIndex, this.filteredRows);
        }
    }

    gotoPage(page: number, pageSize: number) {
        const pageRecords = this.rows.slice((page - 1) * pageSize, page * pageSize);
        this.filteredRows = pageRecords;
    }
}
