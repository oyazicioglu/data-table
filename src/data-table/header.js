import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';
import { Row } from './row.js';

export class Header extends Row {
    /** @type {boolean} */
    #sortable = true;

    /** @type {string} */
    uuid;

    /**
     * @param {Cell[]} cells
     * @param {boolean} selectable
     * @param {boolean} visible
     * @param {boolean} sortable
     */
    constructor(cells = [], selectable = true, visible = true, sortable = true) {
        super(cells, visible, selectable);
        this.setSortable(sortable);
        this.uuid = uuid();
    }

    /**
     * @param {boolean} sortable
     */
    setSortable(sortable) {
        this.#sortable = sortable;
    }

    getSortable() {
        return this.#sortable;
    }
}
