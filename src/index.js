import { Table } from './data-table/table.js';

const data = {
    columns: [
        {
            name: 'Name',
            type: 'string',
        },
        {
            name: 'Name',
            type: 'string',
        },
        {
            name: 'Name',
            type: 'string',
        },
    ],
    rows: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['F', 'G', 'H'],
        ['I', 'J', 'K'],
    ],
};

const table = new Table();
table.createFromJSON(data);

table.getRows().forEach((row) => {
    console.table(row.toValueObject());
});
