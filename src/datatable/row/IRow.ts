import { IColumn } from '../../index.js';

export interface IRow {
    [key: string]: any;
    values: string[];
    options?: RowOptions;
    search(searchValue: string, columns: IColumn[]): boolean;
}

export type RowOptions = {
    selectable: boolean;
    visible: boolean;
};
