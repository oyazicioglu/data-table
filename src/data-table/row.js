import { Cell } from './cell.js';
import { v4 as uuid } from 'uuid';

export class Row {
    /** @type {Cell[]} */
    #cells;

    /** @type {string} */
    uuid;

    /** @type {boolean} */
    #selectable = true;

    /** @type {boolean} */
    #visible = true;

    /**
     *
     * @param {Cell[]} cells
     * @param {boolean} selectable
     * @param {boolean} visible
     */
    constructor(cells, visible = true, selectable = true) {
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
            cell.setRow(this);
        });
    }

    getCells() {
        return this.#cells;
    }

    /**
     * @param {Cell[]} cell
     */
    addCell(cell) {
        if (!this.#cells) {
            this.#cells = [];
        }

        this.#cells.push(cell);
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
