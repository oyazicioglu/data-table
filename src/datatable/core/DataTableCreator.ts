import { DataTable } from './';
import type { IDataTable, DataTableOptions } from './';

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
