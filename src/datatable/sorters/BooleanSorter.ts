import { IRow } from "../../index.js";
import { Sortable, SortDirection } from "./Sortable.js";

export class BooleanSorter implements Sortable {
  sort(direction: SortDirection, columnIndex: number, rows: IRow[]): IRow[] {
    switch (direction) {
      case "ASC":
        return this.sortAscending(columnIndex, rows);
      case "DESC":
        return this.sortDescending(columnIndex, rows);
      default:
        return rows;
    }
  }

  private sortAscending = (columnIndex: number, rows: IRow[]) => {
    return rows.sort((row1, row2) => {
      return (
        Number(row2.values[columnIndex]) - Number(row1.values[columnIndex])
      );
    });
  };

  private sortDescending = (columnIndex: number, rows: IRow[]) => {
    return rows.sort((row1, row2) => {
      return (
        Number(row1.values[columnIndex]) - Number(row2.values[columnIndex])
      );
    });
  };
}
