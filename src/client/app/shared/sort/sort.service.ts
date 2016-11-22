/**
 * Created by sange on 30/10/2016.
 */

import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Sort } from "./sort";
import { Constants } from "../config/app.constants";
import { AppState } from '../../app.state';
import { NoneSortAction, AscSortAction, DescSortAction } from './sort.actions';

@Injectable()
export class SortService {

  private _sorts: Sort[];
  private _sort: Observable<Sort>;
  private orderValue: number = 0;

  constructor(private store: Store<AppState>) {
    this._sort = <Observable<Sort>> store.select('_sort');
  }

  changeSort() {
    this.orderValue = (this.orderValue + 1) % 3;

    switch (this.orderValue) {
      case 0:
        this.store.dispatch(new NoneSortAction());
        break;
      case 1:
        this.store.dispatch(new AscSortAction());
        break;
      case 2:
        this.store.dispatch(new DescSortAction());
        break;

    }
  }

  getSortString(){
    return this._sort.map(s => s.order ? s.order : '');
  }


  get sort(): Observable<Sort> {
    return this._sort;
  }

////////////////

  setSorts(...sorts: Sort[]) {
    this._sorts = sorts;
  }

  getSortFor(field: string): Sort {
    if (this._sorts) {
      return this._sorts.find(sort => sort.field === field);
    }
    return null;
  }

  changeOrderFor(field: string, orderValue: number) {
    if (this._sorts) {
      this._sorts.forEach(sort => sort.order = null);
      let sort = this._sorts.find(sort => sort.field === field);
      sort.order = this.getOrderString(orderValue);
    }
  }

  private getOrderString(orderValue: number): string {
    switch (orderValue) {
      case 1:
        return Constants.sort.asc;
      case 2:
        return Constants.sort.desc;
      default:
        return null;
    }
  }
}
