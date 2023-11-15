import { IObservable, Obserbable } from "@qei/event-system";
import { IRow, SortDirection, Sortable } from "../../index.js";

export const onFilteredRowsChanged: IObservable<IRow[]> = new Obserbable();
export const onRowsSorted: IObservable<{
  sorter: Sortable;
  index: number;
  direction: SortDirection;
}> = new Obserbable();
export const onRowsChanged: IObservable<IRow[]> = new Obserbable();
export const onReset: IObservable<IRow[]> = new Obserbable();

export const onFilterCriteriaChanged: IObservable<undefined> = new Obserbable();
export const onSearchCriteriaChanged: IObservable<undefined> = new Obserbable();

export const onTotalRecordChanged: IObservable<number> = new Obserbable();
export const onPageChanged: IObservable<number> = new Obserbable();
export const onPageSizeChanged: IObservable<number> = new Obserbable();
export const onTotalPagesChanged: IObservable<number> = new Obserbable();
