import { Table } from './data-table/table.js';

const data = {
    header: ['Header1', 'Header2', 'Header3'],
    rows: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['F', 'G', 'H'],
    ],
};

const table = new Table();
table.createFromJSON(data);

table.getColumns().forEach((column) => {
    column.getCells().forEach((cell) => {
        console.log(cell.toValueObject());
    });
});

/* table
    .getHeader()
    .getCells()
    .forEach((cell) => {
        console.log(cell.toValueObject());
    }); */
