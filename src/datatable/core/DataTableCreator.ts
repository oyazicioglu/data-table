import { DataTable } from "./DataTable.js";
import { DataTableOptions, IDataTable } from "./IDataTable.js";
import { JSONConverter } from "datatable/convertables/JSONConverter.js";
import { CSVConverter } from "datatable/convertables/CSVConverter.js";

export class DataTableCreator {
  static emptyTable(): IDataTable {
    return new DataTable(undefined);
  }

  static fromJSON(
    convertableData: JSONConverter,
    options?: DataTableOptions
  ): IDataTable {
    const table = new DataTable(convertableData, options);
    return table;
  }

  static fromCSV(
    convertableData: CSVConverter,
    options?: DataTableOptions
  ): IDataTable {
    const table = new DataTable(convertableData, options);
    return table;
  }
}
