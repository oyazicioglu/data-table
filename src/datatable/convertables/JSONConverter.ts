import { IRow } from "datatable/row/IRow";
import { Convertable } from "./Convertable";
import { Row } from "datatable/row/Row";

export class JSONConverter implements Convertable {
  constructor(public rawData: Object[]) {}

  convert(): IRow[] {
    return this.fromJson(this.rawData);
  }

  private fromJson(jsonData: Object[]) {
    let rows: IRow[] = [];
    jsonData.forEach((datum) => {
      let newRow = new Row();
      for (const [key, value] of Object.entries(datum)) {
        newRow[key] = value;
        newRow.values.push(value);
      }

      rows.push(newRow);
    });

    return rows;
  }
}
