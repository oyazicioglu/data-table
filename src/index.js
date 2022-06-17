import { Table } from './data-table/table.js';

const data = {
    headers: ['Header1', 'Header2', 'Header3'],
    rows: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['F', 'G', 'H'],
    ],
};

const table = new Table();
table.createFromJSON(data);

table.getColumns().forEach((column) => {
    console.log(column.toValueObject());
});
