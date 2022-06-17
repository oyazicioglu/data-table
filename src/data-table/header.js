import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';
import { Row } from './row.js';

export class Header extends Row {
    /** @type {boolean} */
    #sortable = true;

    /** @type {string} */
    #name;

    /** @type {string} */
    uuid;

    /**
     *
     * @param {Cell[]} cells
     * @param {string} name
     * @param {boolean} selectable
     * @param {boolean} visible
     * @param {boolean} sortable
     */
    constructor(cells = [], name = undefined, selectable = true, visible = true, sortable = true) {
        super(cells, visible, selectable);
        this.setName(name);
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

    setName(name) {
        if (name) {
            this.#name = name;
        }
    }

    getName() {
        return this.#name;
    }
}
