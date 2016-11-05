/**
 * Created by sange on 05/11/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DepartureFilter} from "../shared/util/filter";

const emptyFilter: DepartureFilter = {from: '', to: ''};

// TODO reactive forms pro validace inputu

@Component({
  moduleId: module.id,
  selector: 'departure-filter',
  templateUrl: 'departure-filter.component.html'
})
export class DepartureFilterComponent implements OnInit {

  filter = emptyFilter;

  @Output()
  onDepartureFilterChange = new EventEmitter<DepartureFilter>();

  constructor() {
  }

  ngOnInit() {
  }

  clearFilter(){
    this.filter.from = '';
    this.filter.to = '';
    this.applyFilter();
  }

  applyFilter() {
    this.onDepartureFilterChange.emit(this.filter);
  }

}