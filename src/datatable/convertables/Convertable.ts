import { IRow } from "datatable/row/IRow";

export interface Convertable {
  convert(): IRow[];
  rawData: Object[];
}
