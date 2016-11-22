/**
 * Created by sange on 22/11/2016.
 */

import { ActionReducer, Action } from '@ngrx/store';
import { Sort } from './sort';
import { ActionTypes } from './sort.actions';
import { Constants } from '../config/app.constants';

export const sortNameField = 'name';
export const defaultNameSort: Sort = {
  order: null,
  field: sortNameField
};

export const sortReducer: ActionReducer<Sort> = (state: Sort = defaultNameSort, action: Action) => {
  switch (action.type) {
    case ActionTypes.NONE:
      return defaultNameSort;

    case ActionTypes.ASC:
      return {
        order: Constants.sort.asc,
        field: sortNameField
      };

    case ActionTypes.DESC:
      return {
        order: Constants.sort.desc,
        field: sortNameField
      };

    default:
      return state;
  }
};
