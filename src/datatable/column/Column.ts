import { IObservable, Obserbable } from "qei-event-system";
import {
  IRow,
  Sortable,
  SorterCreator,
  onFilteredRowsChanged,
  onSearchCriteriaChanged,
} from "../../index.js";
import { ColumnOptions, IColumn } from "./IColumn.js";

export class Column implements IColumn {
  private _sorter: Sortable | undefined;
  public get sorter(): Sortable | undefined {
    return this._sorter;
  }
  private set sorter(v: Sortable | undefined) {
    this._sorter = v;
  }

  private _options: ColumnOptions;
  public get options(): ColumnOptions {
    return this._options;
  }
  public set options(v: ColumnOptions) {
    this._options = v;
  }

  private _index: number;
  public get index(): number {
    return this._index;
  }
  private set index(v: number) {
    this._index = v;
  }

  private _searchCriteria: string = "";
  public get searchCriteria(): string {
    return this._searchCriteria;
  }
  public set searchCriteria(v: string) {
    if (this._searchCriteria !== v) {
      this._searchCriteria = v;
      onSearchCriteriaChanged.notify(undefined);
    }
  }

  private _filteredRows: IRow[] = [];
  public get filteredRows(): IRow[] {
    return this._filteredRows;
  }
  public set filteredRows(v: IRow[]) {
    this._filteredRows = v;
  }

  private _isKey: boolean = false;
  public get isKey(): boolean {
    return this._isKey;
  }
  public set isKey(v: boolean) {
    this._isKey = v;
  }

  public onReset: IObservable<undefined> = new Obserbable<undefined>();

  constructor(options: ColumnOptions, index: number) {
    this._options = options;
    this._index = index;

    if (options.isKey) {
      this._isKey = options.isKey;
    }

    onFilteredRowsChanged.subscribe((data) => {
      this.filteredRows = data;
    });

    if (options.sortable) {
      this._sorter = SorterCreator.fromType(options.type);
    }
  }

  getValues(rows: IRow[]): string[] {
    return rows.map((row) => row.values[this.index]);
  }

  getUniqueValues(rows: IRow[]): string[] {
    if (!this.options.filterable) {
      return [];
    }
    const values = this.getValues(rows);
    const set = new Set(values);
    return Array.from(set);
  }

  getValueWithRow(rows: IRow[]): { value: string; row: IRow }[] {
    const valueWithRow: { value: string; row: IRow }[] = [];
    rows.forEach((row) => {
      if (!this.options.hidden) {
        valueWithRow.push({ value: row.values[this.index], row });
      }
    });
    return valueWithRow;
  }

  reset() {
    this.searchCriteria = "";
    this.onReset.notify(undefined);
  }

  search(rows: IRow[]): IRow[] {
    if (this.options.hidden) {
      return rows;
    }

    let foundRows: IRow[] = [];
    let criterias =
      this.searchCriteria === ""
        ? []
        : this.searchCriteria
            .trim()
            .split(",")
            .filter((value) => value !== "");

    const values = this.getValues(rows);

    if (criterias.length <= 0) {
      return rows;
    }

    values.forEach((value, index) => {
      criterias.forEach((criteria) => {
        const foundValueIndex = value
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(criteria.trim().toLowerCase());

        if (foundValueIndex !== -1) {
          foundRows.push(rows[index]);
        }
      });
    });

    return foundRows;
  }
}
