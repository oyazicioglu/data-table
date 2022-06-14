import { v4 as uuid } from 'uuid';
import { Cell } from './cell.js';

export class Column {
    /** @type {Cell[]} */
    #cells;

    /** @type {boolean} */
    #selectable = true;

    /** @type {boolean} */
    #visible = true;

    /** @type {string} */
    uuid;

    /**
     *
     * @param {Cell[]} cells
     * @param {boolean} selectable
     * @param {boolean} visible
     */
    constructor(cells, selectable = true, visible = true) {
        this.uuid = uuid();
        this.setCells(cells);
        this.setVisiblity(visible);
        this.setSelectable(selectable);
    }

    /**
     * @param {boolean} visible
     */
    setVisiblity(visible) {
        this.#visible = visible;

        if (!this.#cells) {
            return;
        }

        this.#cells.forEach((cell) => {
            cell.setVisibility(visible);
        });
    }

    /**
     * @param {boolean} selectable
     */
    setSelectable(selectable) {
        this.#selectable = selectable;

        if (!this.#cells) {
            return;
        }

        this.#cells.forEach((cell) => {
            cell.setSelectable(selectable);
        });
    }

    isVisible() {
        return this.#visible;
    }

    isSelectable() {
        return this.#selectable;
    }

    /**
     * @param {Cell[]} cells
     */
    setCells(cells) {
        if (!cells) {
            return;
        }

        this.#cells = cells;
        this.#cells.forEach((cell) => {
            cell.setColumn(this);
        });
    }

    getCells() {
        return this.#cells;
    }

    /**
     * @param {string} uuid
     * @returns {Cell?}
     */
    getCellByUUID(uuid) {
        if (!this.#cells) {
            return undefined;
        }

        return this.#cells.find((cell) => (cell.uuid = uuid));
    }

    /**
     * @param {number} index
     * @returns {Cell?}
     */
    getCellByIndex(index) {
        if (!this.#cells) {
            return undefined;
        }

        return this.#cells[index];
    }

    toValueObject() {
        const cells = this.getCells()?.map((cell) => {
            return cell.toValueObject();
        });

        return {
            uuid: this.uuid,
            selectable: this.isSelectable(),
            visible: this.isVisible(),
            cells: cells,
        };
    }
}
