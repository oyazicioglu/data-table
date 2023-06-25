import { IRow } from '../../index.js';
import { Sortable, SortDirection } from './Sortable.js';

export class StringSorter implements Sortable {
    sort(direction: SortDirection, columnIndex: number, rows: IRow[]): IRow[] {
        switch (direction) {
            case SortDirection.Asc:
                return this.sortAscending(columnIndex, rows);
            case SortDirection.Desc:
                return this.sortDescending(columnIndex, rows);
            default:
                return rows;
        }
    }

    private sortAscending = (columnIndex: number, rows: IRow[]) => {
        return rows.sort((row1, row2) => {
            if (!row1.values[columnIndex] || !row2.values[columnIndex]) {
                return 0;
            }

            if (
                row1.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en']) >
                row2.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en'])
            ) {
                return -1;
            }
            if (
                row2.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en']) >
                row1.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en'])
            ) {
                return 1;
            }
            return 0;
        });
    };

    private sortDescending = (columnIndex: number, rows: IRow[]) => {
        return rows.sort((row1, row2) => {
            if (!row1.values[columnIndex] || !row2.values[columnIndex]) {
                return 0;
            }
            if (
                row1.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en']) <
                row2.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en'])
            ) {
                return -1;
            }
            if (
                row2.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en']) <
                row1.values[columnIndex].toLocaleLowerCase(['tr', 'bg', 'en'])
            ) {
                return 1;
            }
            return 0;
        });
    };
}
