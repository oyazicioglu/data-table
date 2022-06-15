import { Cell } from './data-table/cell.js';
import { Column } from './data-table/column.js';
import { Row } from './data-table/row.js';
import { Table } from './data-table/table.js';

const rows = [
    new Row([new Cell('A', null, null, true, true), new Cell('B', null, null, true, true), new Cell('C', null, null, true, true)]),
    new Row([new Cell('D', null, null, true, true), new Cell('E', null, null, true, true), new Cell('F', null, null, true, true)]),
    new Row([new Cell('F', null, null, true, true), new Cell('G', null, null, true, true), new Cell('H', null, null, true, true)]),
];

const columns = [
    new Column([new Cell('I', null, null, true, true)]),
    new Column([new Cell('J', null, null, true, true)]),
    new Column([new Cell('K', null, null, true, true)]),
    new Column([new Cell('L', null, null, true, true)]),
];

const table = new Table(rows, columns, []);
table.createEmptyColumn();
table.createEmptyRow();

table.getRows().forEach((row) => {
    console.log(row.toValueObject());
});
/* table.getColumns().forEach((column) => {
    console.log(column.toValueObject());
});
 */
