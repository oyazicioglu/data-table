import {
  BooleanSorter,
  ColumnType,
  DateSorter,
  NumberSorter,
  Sortable,
  StringSorter,
} from "../../index.js";

export class SorterCreator {
  static fromType(type: ColumnType): Sortable {
    switch (type) {
      case "STRING":
        return new StringSorter();
      case "NUMBER":
        return new NumberSorter();
      case "DATE":
        return new DateSorter();
      case "BOOLEAN":
        return new BooleanSorter();
      default:
        return new StringSorter();
    }
  }
}
