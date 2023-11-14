import { IRow } from "../../index.js";

const SortDirections = {
  Asc: "ASC",
  Desc: "DESC",
} as const;

export type SortDirection =
  (typeof SortDirections)[keyof typeof SortDirections];

export interface Sortable {
  sort(direction: SortDirection, columnIndex: number, rows: IRow[]): IRow[];
}
