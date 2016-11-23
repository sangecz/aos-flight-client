/**
 * Created by sange on 30/10/2016.
 */

import {Injectable} from "@angular/core";
import {Sort} from "./sort";
import {Constants} from "../config/app.constants";

@Injectable()
export class SortService {

  private _sorts: Sort[];

  setSorts(...sorts: Sort[]){
    this._sorts = sorts;
  }

  getSortFor(field: string): Sort {
    if(this._sorts) {
      return this._sorts.find(sort => sort.field === field);
    }
    return null;
  }

  changeOrderFor(field: string, orderValue: number) {
    if(this._sorts) {
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