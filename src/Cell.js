import { v4 as uuid } from 'uuid';
import Column from './Column.js';
import Row from './Row.js';

export default class Cell {
    #uuid = undefined;
    #visibility = true;
    #selectable = true;
    #value;
    #row;
    #column;

    /**
     *
     * @param {string} _value
     * @param {Row} _row
     * @param {Column} _column
     * @param {boolean} _selectable
     * @param {boolean} _visibility
     */
    constructor(_value, _row, _column, _selectable = true, _visibility = true) {
        this.#uuid = uuid();
        this.value = _value;
        this.row = _row;
        this.column = _column;
        this.selectable = _selectable;
        this.visibility = _visibility;
    }

    /** @returns {boolean} */
    get visibility() {
        return this.#visibility;
    }

    /** @param {boolean} visible */
    set visibility(visible) {
        this.#visibility = visible;
    }

    /** @param {boolean} selectable */
    set selectable(selectable) {
        this.#selectable = selectable;
    }

    /** @returns {boolean} */
    get selectable() {
        return this.#selectable;
    }

    /** @param {string} value */
    set value(value) {
        this.#value = value;
    }

    /** @returns {string} */
    get value() {
        return this.#value;
    }

    /** @param {Row} row */
    set row(row) {
        this.#row = row;
    }

    /** @returns {Row} */
    get row() {
        return this.#row;
    }

    /** @param {Column} column */
    set column(column) {
        this.#column = column;
    }

    /** @returns {Column} */
    get column() {
        return this.#column;
    }

    /** @returns {string} */
    get uuid() {
        return this.#uuid;
    }

    /** @returns {Object} */
    toValueObject() {
        return {
            value: this.value,
            selectable: this.selectable,
            visible: this.visibility,
            row: this.row,
            column: this.column,
        };
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    search(value) {
        const lowecaseValue = this.value.toLowerCase();
        const lowercaseSearchValue = value.toLowerCase();
        return lowecaseValue.includes(lowercaseSearchValue);
    }
}
