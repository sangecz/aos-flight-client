import { Action } from '@ngrx/store';
import { Sort } from './sort';
/**
 * Created by sange on 22/11/2016.
 */


export const ActionTypes = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC'
};

export class NoneSortAction implements Action {
  type = ActionTypes.NONE;
}

export class AscSortAction implements Action {
  type = ActionTypes.ASC;
}

export class DescSortAction implements Action {
  type = ActionTypes.DESC;
}

export type Actions = NoneSortAction | AscSortAction | DescSortAction