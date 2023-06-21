import { IRow } from '../row';
import { Sortable, SortDirection } from '.';

export class DateSorter implements Sortable {
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
            const date1 = new Date(row1.values[columnIndex]);
            const date2 = new Date(row2.values[columnIndex]);
            return date2.getTime() - date1.getTime();
        });
    };

    private sortDescending = (columnIndex: number, rows: IRow[]) => {
        return rows.sort((row1, row2) => {
            const date1 = new Date(row1.values[columnIndex]);
            const date2 = new Date(row2.values[columnIndex]);
            return date1.getTime() - date2.getTime();
        });
    };
}
