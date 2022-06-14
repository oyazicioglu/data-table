import { Cell } from './cell.js';
import { v4 as uuid } from 'uuid';

export class Header extends Cell {
    /** @type {boolean} */
    #sortable = true;

    /** @type {string} */
    uuid;

    /**
     *
     * @param {string | number | array | boolean | Date} value
     * @param {boolean} selectable
     * @param {boolean} visible
     * @param {boolean} sortable
     */
    constructor(value, selectable = true, visible = true, sortable = true) {
        super(value, selectable, visible);
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
