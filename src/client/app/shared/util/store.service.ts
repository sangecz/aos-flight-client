import { Injectable } from '@angular/core';
/**
 * Created by sange on 04/12/2016.
 */

Injectable()
export class StoreService {

  private store: any;

  constructor() {
    this.store = {};
  }

  set(key: string, val: any) {
    this.store[key] = val;
  }

  get(key: string): any {
    if(this.store[key]) {
      return this.store[key];
    }
    return null;
  }

  clear(key?: string) {
    if(key) {
      delete this.store[key];
    } else {
      this.store = {};
    }
  }
}
