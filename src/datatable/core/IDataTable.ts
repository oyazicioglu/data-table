import type { IColumn } from '../column';
import type { IPagination } from '../pagination';
import type { IRow } from '../row';
import type { SortDirection, Sortable } from '../sorters';

export type DataTableOptions = {
    hasGlobalSearch?: boolean;
    hasPagination?: boolean;
};

export interface IDataTable {
    rows: IRow[];
    columns: IColumn[];
    filteredRows: IRow[];
    globalSearchCriteria: string;
    data: Object[];
    options?: DataTableOptions;
    pagination?: IPagination;
    globalSearch(searchValue: string): void;
    columnSearch(criteria: string, columnIndex: number): void;
    sort(direction: SortDirection, columnIndex: number, sorter: Sortable): void;
    sorter?: Sortable;
    reset(): void;
    gotoPage(page: number, pageSize: number): void;
}
