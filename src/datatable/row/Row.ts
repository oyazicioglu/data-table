import { IColumn } from '../../index.js';
import { UUID } from '../UUID.js';
import { IRow, RowOptions } from './IRow.js';

export class Row implements IRow {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    private _values: string[];
    public get values(): string[] {
        return this._values;
    }
    public set values(v: string[]) {
        this._values = v;
    }

    private _options: RowOptions | undefined;
    public get options(): RowOptions | undefined {
        return this._options;
    }
    public set options(v: RowOptions | undefined) {
        this._options = v;
    }

    constructor(values: string[], options: RowOptions | undefined = undefined) {
        this._id = UUID.create();
        this._options = options;
        this._values = values;
    }

    search(searchValue: string, columns: IColumn[]): boolean {
        if (!this.options?.visible) {
            return false;
        }

        const criterias = searchValue.split(',');
        let found = false;
        this.values.forEach((value, index) => {
            if (!value) {
                return;
            }

            /* if (columns[index]?.options?.hidden === true || !columns[index]?.options?.searchable) {
                return;
            } */

            criterias.forEach((criteria) => {
                if (!criteria) {
                    return;
                }

                if (
                    value.toString().trim().toLowerCase().indexOf(criteria.trim().toLowerCase()) !==
                    -1
                ) {
                    found = true;
                    return;
                }
            });
            if (found) {
                return;
            }
        });

        return found;
    }
}
