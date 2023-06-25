import { IRow } from '../../index.js';

export enum SortDirection {
    Asc,
    Desc,
}

export interface Sortable {
    sort(direction: SortDirection, columnIndex: number, rows: IRow[]): IRow[];
}
