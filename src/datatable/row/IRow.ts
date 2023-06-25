import { IColumn } from '../../index.js';

export interface IRow {
    id: string;
    values: string[];
    options?: RowOptions;
    search(searchValue: string, columns: IColumn[]): boolean;
}

export type RowOptions = {
    selectable: boolean;
    visible: boolean;
};
