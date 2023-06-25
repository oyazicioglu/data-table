import { ISubject } from 'qei-event-system';
import { IRow, Sortable } from '../../index.js';

export type ColumnOptions = {
    title?: string;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    type: ColumnType;
    width?: string;
    hidden?: boolean;
    isKey?: boolean;
};

export enum ColumnType {
    String,
    Number,
    Date,
    Boolean,
    Component,
}

export interface IColumn {
    options: ColumnOptions;
    sorter?: Sortable;
    index: number;
    searchCriteria: string;
    isKey: boolean;
    getValues(rows: IRow[]): string[];
    getValueWithRow(rows: IRow[]): { value: string; row: IRow }[];
    getUniqueValues(rows: IRow[]): string[];
    search(rows: IRow[]): IRow[];
    reset(): void;
    onReset: ISubject<undefined>;
}
