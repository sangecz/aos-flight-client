/**
 * Created by sange on 22/11/2016.
 */

import { ActionReducer, Action } from '@ngrx/store';

import * as flight from './flight.actions';
import { Constants } from '../config/app.constants';
import { FlightState } from './flight.state';

export const defaultState: FlightState = {
  sort: {
    order: '',
    field: ''
  }
};

export const flightReducer: ActionReducer<FlightState> = (state = defaultState, action: Action) => {
  switch (action.type) {
    case flight.ActionTypes.sort.NONE:
      return defaultState;

    case flight.ActionTypes.sort.ASC:
      return {
        sort: {
          order: Constants.sort.asc,
          field: action.payload
        }
      };

    case flight.ActionTypes.sort.DESC:
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
