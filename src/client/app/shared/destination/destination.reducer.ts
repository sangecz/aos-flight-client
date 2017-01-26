/**
 * Created by sange on 22/11/2016.
 */

import { ActionReducer, Action } from '@ngrx/store';
import * as destination from './destination.actions';
import { Constants } from '../config/app.constants';
import { DestinationState } from './destination.state';

export const defaultState: DestinationState = {
  sort: {
    order: '',
    field: ''
  }
};

export const destinationReducer: ActionReducer<DestinationState> = (state = defaultState, action: Action) => {
  switch (action.type) {
    case destination.ActionTypes.sort.NONE:
      return defaultState;

    case destination.ActionTypes.sort.ASC:
      return {
        sort: {
          order: Constants.sort.asc,
          field: action.payload
        }
      };

    case destination.ActionTypes.sort.DESC:
      return {
        sort: {
          order: Constants.sort.desc,
          field: action.payload
        }
      };

    default:
      return state;
  }
};
