import { Table } from './data-table/table.js';

const data = {
    columns: [
        {
            name: 'Name',
            type: 'string',
            visible: true,
            selectable: true,
        },
        {
            name: 'Surename',
            type: 'string',
            visible: true,
            selectable: true,
        },
        {
            name: 'Age',
            type: 'string',
            visible: true,
            selectable: true,
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

table.getRows(true).forEach((row) => {
    console.table(row.toValueObject());
});
