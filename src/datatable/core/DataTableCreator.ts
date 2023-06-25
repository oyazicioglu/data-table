import { DataTable } from './DataTable.js';
import { DataTableOptions, IDataTable } from './IDataTable.js';

export class DataTableCreator {
    static emptyTable(): IDataTable {
        return new DataTable(undefined);
    }

    static fromJson(data: Object[], options?: DataTableOptions): IDataTable {
        const table = new DataTable(options);
        table.data = data;
        return table;
    }
}
