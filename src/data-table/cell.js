import { v4 as uuid } from 'uuid';
import { Column } from './column.js';
import { Row } from './row.js';

export class Cell {
    /** @type {string | number | array | boolean | Date} */
    #value;

    /** @type {string} */
    uuid;

    /** @type {Row} */
    #row;

    /** @type {Column} */
    #column;

    /** @type {boolean} */
    #selectable;

    /** @type {boolean} */
    #visible;

    /**
     *
     * @param {string | number | array | boolean | Date} value
     * @param {boolean} selectable
     * @param {boolean} visible
     * @param {Row} row
     * @param {Column} column
     */
    constructor(value, row, column, selectable = true, visible = true) {
        this.uuid = uuid();
        this.setColumn(column);
        this.setRow(row);
        this.setValue(value);
        this.setVisibility(visible);
        this.setSelectable(selectable);
    }

    /**
     * @param {boolean} visible
     */
    setVisibility(visible) {
        this.#visible = visible;
    }

    /**
     * @param {boolean} selectable
     */
    setSelectable(selectable) {
        this.#selectable = selectable;
    }

    isVisible() {
        return this.#visible;
    }

    isSelectable() {
        return this.#selectable;
    }

    /**
     * @param {string | number | array | boolean | Date} value
     */
    setValue(value) {
        this.#value = value;
    }

    getValue() {
        return this.#value;
    }

    /**
     * @param {Row} row
     */
    setRow(row) {
        this.#row = row;
    }

    getRow() {
        return this.#row;
    }

    /**
     * @param {Column} column
     */
    setColumn(column) {
        this.#column = column;
    }

    getColumn() {
        return this.#column;
    }

    toValueObject() {
        return {
            value: this.getValue(),
            selectable: this.isSelectable(),
            visible: this.isVisible(),
            row: this.#row,
            column: this.#column,
        };
    }
}
