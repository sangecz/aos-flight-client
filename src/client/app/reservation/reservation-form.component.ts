/**
 * Created by sange on 23/10/2016.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Constants } from '../shared/config/app.constants';
import { reservationStates } from './reservation-states';

@Component({
  moduleId: module.id,
  selector: 'reservation-form',
  templateUrl: 'reservation-form.component.html',
  styles: [`
    input[type="text"], input[type="number"], input[type="password"], select{
      float: right;
      width: 250px;
    }
    
    td {
      width: 330px;
    }
  `]
})
export class ReservationFormComponent implements OnInit {

  private reservationFG: FormGroup;
  private reservationValue: Reservation;
  private detail: boolean = false;
  private submitTxt: string = '';
  private _flights: Flight[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set reservation(val: Reservation) {
    this.reservationValue = val || Object.assign({});

    if (val && val.flight && val.seats && val.created && val.state) {
      // overriden by ngOnInit call later
      this.reservationFG.setValue({
        flight: val.flight,
        seats: val.seats,
        created: val.created,
        state: val.state
      });
    }
  }

  @Input()
  set flights(flights: Flight[]) {
    if (flights) {
      this._flights = flights;

      if (!this.detail && this._flights.length > 0 && !this.detail) {
        // overriden by ngOnInit call later
        this.reservationFG.get('flight').setValue(this._flights[0].id);
      }
    }
  }

  @Output() onReservationChange = new EventEmitter<Reservation>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.detail) {
      this.submitTxt = 'Cancel reservation';

      this.reservationFG.reset({
        flight: {value: this._flights[0].id, disabled: true},
        seats: {value: this.reservationValue.seats, disabled: true},
        created: {value: this.reservationValue.created, disabled: true},
        state: {value: this.reservationValue.state, disabled: true}
      });

    } else {
      this.submitTxt = 'Save';
    }
  }

  onSubmit() {
    if (!this.reservationFG.invalid) {
      this.reservationValue.flight = +this.reservationFG.value.flight;
      this.reservationValue.seats = +this.reservationFG.value.seats;

      this.onReservationChange.emit(this.reservationValue);
      if (!this.detail) {
        this.createForm();
      }
    }
  }

  back() {
    this.onBack.emit();
  }

  remove() {
    this.onRemove.emit(this.reservationValue.id);
  }

  showSubmitBtn(): boolean {
    if (!this.detail) {
      return true;
    }

    return this.reservationValue && this.reservationValue.state === reservationStates.NEW;
  }

  showDeleteBtn(): boolean {
    if (!this.detail) {
      return false;
    }
    return this.reservationValue && this.reservationValue.state !== reservationStates.PAID;
  }

  private createForm() {
    this.reservationFG = this.fb.group({
      flight: ['', [Validators.required]],
      seats: ['', [Validators.required, Validators.pattern(Constants.regexp.POSITIVE_NUMBER)]],
      created: ['', []],
      state: ['', []]
    });
  }

}
