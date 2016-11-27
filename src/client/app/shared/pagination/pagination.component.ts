/**
 * Created by sange on 30/10/2016.
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Pagination } from './pagination';

const initPagination: Pagination = {base: 10, offset: 0};

@Component({
  moduleId: module.id,
  selector: 'pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.css']
})
export class PaginationComponent {

  private pagination: Pagination = initPagination;
  private _recordCount: number = 0;
  bases = [5, 10, 20, 50, 100];

  @Input()
  set recordCount(cnt: number) {
    this._recordCount = cnt;
  }

  @Output() onPaginationChange = new EventEmitter<Pagination>();

  paginationBaseChanged(base: number) {
    this.pagination.base = base;
    this.pagination.offset = 0;
    this.onPaginationChange.emit(this.pagination);
  }

  nextPage() {
    if (!this.isAtLastPage()) {
      this.pagination.offset += this.pagination.base;
      this.onPaginationChange.emit(this.pagination);
    }
  }

  prevPage() {
    if (!this.isAtFirstPage()) {
      this.pagination.offset -= this.pagination.base;
      this.onPaginationChange.emit(this.pagination);
    }
  }

  isAtFirstPage() {
    return this.pagination.offset - this.pagination.base < 0;
  }

  isAtLastPage() {
    return this.pagination.offset + this.pagination.base >= this._recordCount;
  }
}
