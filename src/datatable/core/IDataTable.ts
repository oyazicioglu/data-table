import {
  IRow,
  IColumn,
  IPagination,
  SortDirection,
  Sortable,
} from "../../index.js";

export type DataTableOptions = {
  hasGlobalSearch?: boolean;
  hasPagination?: boolean;
};

export interface IDataTable {
  [key: string]: any;
  rows: IRow[];
  columns: IColumn[];
  filteredRows: IRow[];
  globalSearchCriteria: string;
  options?: DataTableOptions;
  pagination?: IPagination;
  globalSearch(searchValue: string): void;
  columnSearch(criteria: string, columnIndex: number): void;
  sort(direction: SortDirection, columnIndex: number, sorter: Sortable): void;
  sorter?: Sortable;
  reset(): void;
  gotoPage(page: number, pageSize: number): void;
}
