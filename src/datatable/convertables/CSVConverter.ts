import { IRow } from "datatable/row/IRow";
import { Convertable } from "./Convertable";

export class CSVConverter implements Convertable {
  constructor(public rawData: Object[]) {}

  convert(): IRow[] {
    throw new Error("Method not implemented.");
  }
}
