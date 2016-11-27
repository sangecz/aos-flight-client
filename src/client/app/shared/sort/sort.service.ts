/**
 * Created by sange on 30/10/2016.
 */

import { Injectable } from "@angular/core";
import { Sort } from "./sort";
import { Constants } from "../config/app.constants";
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as destination from '../destination/destination.actions';
import * as flight from '../flight/flight.actions';
import { State } from '../../app.state';
import { DESTINATION_TAG } from '../destination/destination.state';

@Injectable()
export class SortService {

  private _sorts: Sort[];

  private mySorts: any = {};

  constructor(private store: Store<State>) {
  }

  /**
   * Initializes sort for given tag and field.
   * @param tag identifies component
   * @param field identifies sort column
   * @returns {Observable<State>}
   */
  registerSort(tag: string, field: string) {
    this.mySorts[tag] = {
      orderValue: 0,
      field
    };
    return this.store.select(tag);
  }

  /**
   * Toggles next order of the sort for given tag and field.
   * @param tag identifies component
   * @param field identifies sort column
   */
  toggleSort(tag: string, field: string) {
    if (!(tag in this.mySorts)) return;

    this.store.dispatch(this.getAction(tag, field));
  }

  switchSort(tag: string, field: string) {
    if (!(tag in this.mySorts)) return;

    this.mySorts[tag].orderValue = 0;
    this.mySorts[tag].field = field;
  }

  /**
   * Toggles next order of the sort and returns an appropriate action.
   * @param tag
   * @param field
   * @returns Action action for reducer
   */
  private getAction(tag: string, field: string): Action {
    this.mySorts[tag].orderValue = (this.mySorts[tag].orderValue + 1) % 3;

    if(tag === DESTINATION_TAG) {
      switch (this.mySorts[tag].orderValue) {
        case 1:
          return new destination.AscSortAction(field);
        case 2:
          return new destination.DescSortAction(field);
        default:
          return new destination.NoneSortAction(field);
      }
    } else {
      switch (this.mySorts[tag].orderValue) {
        case 1:
          return new flight.AscSortAction(field);
        case 2:
          return new flight.DescSortAction(field);
        default:
          return new flight.NoneSortAction(field);
      }
    }
  }




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