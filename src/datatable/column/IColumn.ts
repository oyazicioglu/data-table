import { IObservable } from "@qei/event-system";
import { IRow, Sortable } from "../../index.js";

export type ColumnOptions = {
  title?: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  type: ColumnType;
  width?: string;
  hidden?: boolean;
  isKey?: boolean;
};

const ColumnTypes = {
  String: "STRING",
  Number: "NUMBER",
  Date: "DATE",
  Boolean: "BOOLEAN",
  Component: "COMPONENT",
} as const;

export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes];

export interface IColumn {
  [key: string]: any;
  options: ColumnOptions;
  sorter?: Sortable;
  index: number;
  searchCriteria: string;
  isKey: boolean;
  getValues(rows: IRow[]): string[];
  getValueWithRow(rows: IRow[]): { value: string; row: IRow }[];
  getUniqueValues(rows: IRow[]): string[];
  search(rows: IRow[]): IRow[];
  reset(): void;
  onReset: IObservable<undefined>;
}
