/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

const emptyReservation: any = {
  name: null,
  lat: null,
  lon: null
};

// TODO pridat password pro getOne/update
@Component({
  moduleId: module.id,
  selector: 'reservation-form',
  styleUrls: ['reservation-form.component.css'],
  templateUrl: 'reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {

  // FIXME role
  private isAdmin: boolean = true;
  private reservationFG: FormGroup;
  private reservationValue: Reservation;
  private detail: boolean = false;
  private submitTxt: string = '';

  constructor(private fb: FormBuilder) {
    this.reservationFG = this.fb.group({
      flightName: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      created: ['', []],
      state: ['', []],
      password: ['', []]
    });
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set reservation(val: Reservation) {
    this.reservationValue = val;

    if (val && val.flightName && val.seats && val.created && val.state) {
      this.reservationFG.setValue({
        flightName: val.flightName,
        seats: val.seats,
        created: val.created,
        state: val.state,
        password: ''
      });
    }
  }

  @Output() onReservationChange = new EventEmitter<Reservation>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();

  ngOnInit(): void {
    if(this.detail) {
      this.submitTxt = 'Proceed';

      this.reservationFG.reset({
        flightName: {value: '', disabled: true},
        seats: {value: '', disabled: true},
        created: {value: '', disabled: true},
        state: {value: '', disabled: true}
      });

      if(!this.isAdmin) {
        this.reservationFG.get('password').setValidators([Validators.required, Validators.minLength(3)]);
      }

    } else {
      this.submitTxt = 'Save';
    }
  }

  onSubmit() {
    if (this.reservationFG.valid) {
      this.reservationValue.flightName = this.reservationFG.value.flightName;
      this.reservationValue.seats = +this.reservationFG.value.seats;
      this.reservationValue.password = this.reservationFG.value.password;
      this.onReservationChange.emit(this.reservationValue);
    }
  }

  back(){
    this.onBack.emit();
  }

  remove(){
    this.onRemove.emit(this.reservationValue.id);
  }


}