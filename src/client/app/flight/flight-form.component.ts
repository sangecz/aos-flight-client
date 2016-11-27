/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Constants } from '../shared/config/app.constants';
import { DestinationService } from '../shared/destination/destination.service';
import { validateDateTime } from '../shared/forms/validator';

@Component({
  moduleId: module.id,
  selector: 'flight-form',
  styleUrls: ['flight-form.component.css'],
  templateUrl: 'flight-form.component.html'
})
export class FlightFormComponent implements OnInit {

  private flightFG: FormGroup;
  private flightValue: Flight;
  private detail: boolean = false;
  private destinations: Destination[];
  datetimePlaceholder = Constants.DATETIME_PLACEHOLDER;

  constructor(private fb: FormBuilder,
              private destinationService: DestinationService) {
    this.createForm();
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set flight(val: Flight) {
    this.flightValue = val || Object.assign({});

    if (val && val.name && val.dateOfDeparture && val.seats && val.from && val.to) {
      this.flightFG.setValue({
        name: val.name,
        dateOfDeparture: val.dateOfDeparture,
        seats: val.seats,
        from: val.from,
        to: val.to
      });
    }
  }

  @Output() onFlightChange = new EventEmitter<Flight>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();

  ngOnInit(): void {
    this.getDestionations();
  }

  onSubmit() {
    if (this.flightFG.valid) {
      this.flightValue.name = this.flightFG.value.name;
      this.flightValue.dateOfDeparture = new Date(this.flightFG.value.dateOfDeparture);
      this.flightValue.seats = +this.flightFG.value.seats;
      this.flightValue.from = +this.flightFG.value.from;
      this.flightValue.to = +this.flightFG.value.to;

      this.onFlightChange.emit(this.flightValue);
      this.createForm();
    }
  }

  back() {
    this.onBack.emit();
  }

  remove() {
    this.onRemove.emit(this.flightValue.id);
  }


  private createForm() {
    this.flightFG = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dateOfDeparture: ['', [Validators.required, validateDateTime(false)]],
      seats: ['', [Validators.required, Validators.pattern(Constants.regexp.POSITIVE_NUMBER)]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
  }

  private getDestionations() {
    this.destinationService.getAll(null)
      .subscribe(
        res => {
          this.destinations = res;
          if (this.destinations.length > 0 && !this.detail) {
            this.flightFG.get('from').setValue(this.destinations[0].id);
            this.flightFG.get('to').setValue(this.destinations[0].id);
          }
        },
        err => {

        }
      );
  }
}
