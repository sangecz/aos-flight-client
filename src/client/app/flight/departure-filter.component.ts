/**
 * Created by sange on 05/11/2016.
 */
import { Component, Output, EventEmitter } from '@angular/core';

import { DepartureFilter } from '../shared/filter/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateDateTime } from '../shared/forms/validator';
import { Constants } from '../shared/config/app.constants';

@Component({
  moduleId: module.id,
  selector: 'departure-filter',
  templateUrl: 'departure-filter.component.html',
  styleUrls: ['departure-filter.component.css']
})
export class DepartureFilterComponent {

  filterFG: FormGroup;
  datetimePlaceholder = Constants.DATETIME_PLACEHOLDER;

  @Output()
  onDepartureFilterChange = new EventEmitter<DepartureFilter>();

  constructor(private fb: FormBuilder,) {
    this.createForm();
  }

  onSubmit() {
    if (this.filterFG.valid) {
      this.applyFilter();
    }
  }

  clearFilter() {
    this.createForm();
    let filter: DepartureFilter = {
      from: null,
      to: null
    };
    this.onDepartureFilterChange.emit(filter);
  }

  applyFilter() {
    const from = this.filterFG.get('from').value;
    const to = this.filterFG.get('to').value;
    let filter: DepartureFilter = {
      from: !isNaN(new Date(from).getTime()) ? new Date(from) : null,
      to: !isNaN(new Date(to).getTime()) ? new Date(to) : null
    };
    console.log();
    this.onDepartureFilterChange.emit(filter);
  }

  disableApply(): boolean {
    // const ret = this.filterFG.valid && (this.filterFG.get('from').value !== '' || this.filterFG.get('to').value !== '');
    return false;
  }

  private createForm() {
    this.filterFG = this.fb.group({
      from: ['', [validateDateTime(true)]],
      to: ['', [validateDateTime(true)]]
    });
  }
}
