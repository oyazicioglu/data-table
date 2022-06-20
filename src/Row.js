import { v4 as uuid } from 'uuid';
import Cell from './Cell.js';

export default class Row {
    #uuid = undefined;
    /** @type {Cell[]} */
    #cells = [];
    #visibility = true;
    #selectable = true;
    #type = 'row';

    /**
     *
     * @param {Cell[]} _cells
     * @param {boolean} _visibility
     * @param {boolean} _selectable
     * @param {'ROW' | 'HEADER'} _type
     */
    constructor(_cells = [], _visibility = true, _selectable = true, _type = 'ROW') {
        this.#uuid = uuid();
        this.cell = _cells;
        this.visibility = _visibility;
        this.selectable = _selectable;
        this.type = _type;
    }

    get visibility() {
        return this.#visibility;
    }

    /** @param {boolean} visible */
    set visibility(visible) {
        this.#visibility = visible;

        if (!this.#cells) {
            return;
        }

        this.#cells.forEach((cell) => {
            cell.visibility = visible;
        });
    }

    /** @returns {boolean} */
    get selectable() {
        return this.#selectable;
    }

    /** @param {boolean} selectable */
    set selectable(selectable) {
        this.#selectable = selectable;

        if (!Array.isArray(this.#cells)) {
            this.cells = [];
        }

        this.#cells.forEach((cell) => {
            cell.selectable = selectable;
        });
    }

    /** @param {Cell[]} cells */
    set cells(cells) {
        if (!cells) {
            return;
        }

        this.#cells = cells;
        this.#cells.forEach((cell) => {
            cell.row = this;
        });
    }

    /** @returns {Cell[]} */
    get cells() {
        return this.#cells.filter((cell) => cell.visibility === true);
    }

    get allCells() {
        return this.#cells;
    }

    /** @param {'ROW' | 'HEADER'} type */
    set type(type) {
        this.#type = type;
    }

    /** @returns {string} */
    get type() {
        return this.#type;
    }

    /** @returns {boolean} */
    get isHeader() {
        return this.#type === 'HEADER';
    }

    /** @returns {string} */
    get uuid() {
        return this.#uuid;
    }

    /** @param {Cell} */
    addCell(cell) {
        if (!this.#cells) {
            this.#cells = [];
        }

        cell.row = this;
        this.#cells.push(cell);
    }

    /**
     * @param {string} uuid
     * @returns {Cell}
     */
    getCellByUUID(uuid) {
        if (!this.#cells || !uuid) {
            return undefined;
        }

        return this.#cells.find((cell) => cell.uuid == uuid);
    }

    /**
     * @param {number} index
     * @returns {Cell}
     */
    getCellByIndex(index) {
        if (!this.#cells) {
            return undefined;
        }

        return this.#cells[index];
    }

    /** @returns {Object} */
    toValueObject() {
        const cells = this.cells?.map((cell) => {
            return cell.toValueObject();
        });

        return {
            uuid: this.uuid,
            selectable: this.selectable,
            visibility: this.visibility,
            cells,
            type: this.type,
        };
    }

    search(value) {
        if (!this.#cells) {
            return false;
        }

        return this.cells.some((cell) => cell.search(value));
    }
}
