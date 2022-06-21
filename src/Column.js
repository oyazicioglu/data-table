import Cell from './Cell.js';
import { uuid } from './lib/uuid.js';

export default class Column {
    #uuid = undefined;
    #name = undefined;
    #selectable = true;
    #visibility = true;
    #type = 'string';
    /** @type {Cell[]} */
    #cells = [];

    /**
     *
     * @param {Cell[]} _cells
     * @param {boolean} _selectable
     * @param {boolean} _visibility
     * @param {string} _type
     */
    constructor(_cells = [], _selectable = true, _visibility = true, _type = 'string') {
        this.#uuid = uuid();
        this.cells = _cells;
        this.selectable = _selectable;
        this.visibility = _visibility;
        this.type = _type;
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

        if (!this.#cells) {
            return;
        }

        this.#cells.forEach((cell) => {
            cell.selectable = selectable;
        });
    }

    /** @returns {boolean} */
    get visibility() {
        return this.#visibility;
    }

    /** @param {Cell[]} cells */
    set cells(cells) {
        if (!cells) {
            return;
        }

        this.#cells = cells;
        this.#cells.forEach((cell) => {
            cell.column = this;
        });
    }

    /** @returns {Cell[]} */
    get cells() {
        return this.#cells.forEach((cell) => cell.visibility === true);
    }

    get allCells() {
        return this.#cells;
    }

    /** @param {string} name */
    set name(name) {
        this.#name = name;
    }

    /** @returns {string} */
    get name() {
        return this.#name;
    }

    /** @param {string} type */
    set type(type) {
        this.#type = type;
    }

    get type() {
        return this.#type;
    }

    /** @returns {string} */
    get uuid() {
        return this.#uuid;
    }

    /** @param {Cell} cell */
    addCell(cell) {
        if (!this.#cells) {
            this.#cells = [];
        }

        cell.column = this;
        this.#cells.push(cell);
    }

    /**
     * @param {string} uuid
     * @returns {Cell}
     */
    getCellByUUID(uuid) {
        if (!this.#cells) {
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
            visible: this.visibility,
            cells: cells,
            type: this.type,
            name: this.name,
        };
    }
}
