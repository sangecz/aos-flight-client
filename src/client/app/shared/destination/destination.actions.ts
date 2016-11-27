import { Action } from '@ngrx/store';
import { BaseAction } from '../util/actions';
import { type } from '../util/type-cache';
/**
 * Created by sange on 22/11/2016.
 */

export const ActionTypes = {
  sort: {
    NONE: type('[Destination] sort: NONE'),
    ASC: type('[Destination] sort: ASC'),
    DESC: type('[Destination] sort: DESC'),
  }
};

export class NoneSortAction extends BaseAction implements Action {
  type = ActionTypes.sort.NONE;
}

export class AscSortAction extends BaseAction implements Action {
  type = ActionTypes.sort.ASC;
}

export class DescSortAction extends BaseAction implements Action {
  type = ActionTypes.sort.DESC;
}

export type Actions = NoneSortAction | AscSortAction | DescSortAction