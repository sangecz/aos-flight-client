/**
 * Created by sange on 30/10/2016.
 */

import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import * as destination from '../../destination/destination.actions';
import * as flight from '../../flight/flight.actions';
import { State } from '../../../app.state';
import { DESTINATION_TAG } from '../../destination/destination.state';

@Injectable()
export class SortService {

  private _sorts: any = {};

  constructor(private store: Store<State>) {
  }

  /**
   * Initializes sort for given tag and field.
   * @param tag identifies component
   * @param field identifies sort column
   * @returns {Observable<State>}
   */
  registerSort(tag: string, field: string) {
    this._sorts[tag] = {
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
    if (!(tag in this._sorts)) return;

    this.store.dispatch(this.getAction(tag, field));
  }

  /**
   * Switches sort among fields and resets 
   * @param tag
   * @param field
   */
  switchSort(tag: string, field: string) {
    if (!(tag in this._sorts)) return;

    this._sorts[tag].orderValue = 0;
    this._sorts[tag].field = field;
  }

  /**
   * Toggles next order of the sort and returns an appropriate action.
   * @param tag
   * @param field
   * @returns Action action for reducer
   */
  private getAction(tag: string, field: string): Action {
    this._sorts[tag].orderValue = (this._sorts[tag].orderValue + 1) % 3;

    if (tag === DESTINATION_TAG) {
      switch (this._sorts[tag].orderValue) {
        case 1:
          return new destination.AscSortAction(field);
        case 2:
          return new destination.DescSortAction(field);
        default:
          return new destination.NoneSortAction(field);
      }
    } else {
      switch (this._sorts[tag].orderValue) {
        case 1:
          return new flight.AscSortAction(field);
        case 2:
          return new flight.DescSortAction(field);
        default:
          return new flight.NoneSortAction(field);
      }
    }
  }
}
