import { ISubject, Subject } from 'qei-event-system';
import { IRow, SortDirection, Sortable } from '../../index.js';

export const onFilteredRowsChanged: ISubject<IRow[]> = new Subject();
export const onRowsSorted: ISubject<{ sorter: Sortable; index: number; direction: SortDirection }> =
    new Subject();
export const onRowsChanged: ISubject<IRow[]> = new Subject();
export const onReset: ISubject<IRow[]> = new Subject();

export const onFilterCriteriaChanged: ISubject<undefined> = new Subject();
export const onSearchCriteriaChanged: ISubject<undefined> = new Subject();

export const onTotalRecordChanged: ISubject<number> = new Subject();
export const onPageChanged: ISubject<number> = new Subject();
export const onPageSizeChanged: ISubject<number> = new Subject();
export const onTotalPagesChanged: ISubject<number> = new Subject();
