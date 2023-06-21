import { Sortable, SortDirection } from '.';
import { IRow } from '../row';

export class BooleanSorter implements Sortable {
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
            return Number(row2.values[columnIndex]) - Number(row1.values[columnIndex]);
        });
    };

    private sortDescending = (columnIndex: number, rows: IRow[]) => {
        return rows.sort((row1, row2) => {
            return Number(row1.values[columnIndex]) - Number(row2.values[columnIndex]);
        });
    };
}
