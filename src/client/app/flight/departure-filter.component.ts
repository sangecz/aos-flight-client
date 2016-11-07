/**
 * Created by sange on 05/11/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DepartureFilter} from "../shared/util/filter";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {validateDateTime} from "../shared/forms/validator";
import {Constants} from "../shared/config/app.constants";
import {Util} from "../shared/util/util";

@Component({
  moduleId: module.id,
  selector: 'departure-filter',
  templateUrl: 'departure-filter.component.html',
  styleUrls: ['departure-filter.component.css']
})
export class DepartureFilterComponent implements OnInit {

  filterFG: FormGroup;
  datetimePlaceholder = Constants.DATETIME_PLACEHOLDER;

  @Output()
  onDepartureFilterChange = new EventEmitter<DepartureFilter>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  private createForm() {
    this.filterFG = this.fb.group({
      from: ['', [Validators.required, validateDateTime()]],
      to: ['', [Validators.required, validateDateTime()]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.filterFG.valid) {
      this.applyFilter();
    }
  }

  clearFilter(){
    this.createForm();
    this.applyFilter();
  }

  applyFilter() {
    let filter: DepartureFilter = {
      from: Util.getISODatetimeString(this.filterFG.get('from').value),
      to: Util.getISODatetimeString(this.filterFG.get('to').value)
    };
    this.onDepartureFilterChange.emit(filter);
  }

}