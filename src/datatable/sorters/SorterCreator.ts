import {
    BooleanSorter,
    ColumnType,
    DateSorter,
    NumberSorter,
    Sortable,
    StringSorter,
} from '../../index.js';

export class SorterCreator {
    static fromType(type: ColumnType): Sortable {
        switch (type) {
            case ColumnType.String:
                return new StringSorter();
            case ColumnType.Number:
                return new NumberSorter();
            case ColumnType.Date:
                return new DateSorter();
            case ColumnType.Boolean:
                return new BooleanSorter();
            default:
                return new StringSorter();
        }
    }
}
