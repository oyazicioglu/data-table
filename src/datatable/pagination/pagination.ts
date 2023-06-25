import { IDataTable } from '../../index.js';

export interface IPagination {
    pageSizes: number[];
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    currentPageSize: number;
    nextPage(): void;
    previousPage(): void;
    lastpage(): void;
    firstPage(): void;
}

export class Pagination implements IPagination {
    private _pageSizes: number[] = [];
    public get pageSizes(): number[] {
        return this._pageSizes;
    }
    public set pageSizes(v: number[]) {
        this._pageSizes = v;
    }

    private _totalPages: number = 1;
    public get totalPages(): number {
        return this._totalPages;
    }
    public set totalPages(v: number) {
        this._totalPages = v;

        if (this.totalPages < this.currentPage) {
            this.currentPage = this.totalPages;
        }
    }

    private _totalRecords: number = 1;
    public get totalRecords(): number {
        return this._totalRecords;
    }
    public set totalRecords(v: number) {
        this._totalRecords = v;
        this.totalPages = Math.ceil(v / this.currentPageSize);
    }

    private _currentPage: number = 1;
    public get currentPage(): number {
        return this._currentPage;
    }
    public set currentPage(v: number) {
        this._currentPage = v;
        this.dataTable?.gotoPage(v, this.currentPageSize);
    }

    private _currentPageSize: number = 0;
    public get currentPageSize(): number {
        return this._currentPageSize;
    }
    public set currentPageSize(v: number) {
        this._currentPageSize = v;
        this.totalPages = Math.ceil(this.totalRecords / v);
        this.dataTable?.gotoPage(this.currentPage, this.currentPageSize);
    }

    private _dataTable: IDataTable | undefined;
    public get dataTable(): IDataTable | undefined {
        return this._dataTable;
    }
    public set dataTable(v: IDataTable | undefined) {
        this._dataTable = v;
    }

    constructor() {}

    nextPage(): void {
        this.currentPage++;
    }
    previousPage(): void {
        this.currentPage--;
    }
    lastpage(): void {
        this.currentPage = this.totalPages;
    }
    firstPage(): void {
        this.currentPage = 1;
    }
}
