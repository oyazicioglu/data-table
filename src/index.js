import { Table } from './data-table/table.js';

const columns = [
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
];

const rows = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['F', 'G', 'H'],
    ['I', 'J', 'K'],
];

const table = new Table();
table.createFromJSON(columns, rows);
