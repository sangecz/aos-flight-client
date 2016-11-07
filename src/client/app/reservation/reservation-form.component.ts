/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Constants} from "../shared/config/app.constants";
import {FlightService} from "../shared/flight/flight.service";
import {AuthService} from "../shared/auth/auth.service";

const emptyReservation: any = {
  name: null,
  lat: null,
  lon: null
};

//
// TODO pridat password pro getOne/update
@Component({
  moduleId: module.id,
  selector: 'reservation-form',
  styleUrls: ['reservation-form.component.css'],
  templateUrl: 'reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {

  private reservationFG: FormGroup;
  private reservationValue: Reservation;
  private detail: boolean = false;
  private submitTxt: string = '';
  private _flights: Flight[] = [];

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  private createForm() {
    this.reservationFG = this.fb.group({
      flight: ['', [Validators.required]],
      seats: ['', [Validators.required, Validators.pattern(Constants.regexp.POSITIVE_NUMBER)]],
      created: ['', []],
      state: ['', []]
    });
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set reservation(val: Reservation) {
    this.reservationValue = val;

    if (val && val.flight && val.seats && val.created && val.state) {
      this.reservationFG.setValue({
        flight: val.flight,
        seats: val.seats,
        created: val.created,
        state: val.state
      });
    }
  }

  @Output() onReservationChange = new EventEmitter<Reservation>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();

  ngOnInit(): void {
    this.getFlights();
    if(this.detail) {
      this.submitTxt = 'Cancel reservation';

      this.reservationFG.reset({
        flight: {value: '', disabled: true},
        seats: {value: '', disabled: true},
        created: {value: '', disabled: true},
        state: {value: '', disabled: true}
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
      if(!this.detail){
        this.createForm();
      }
    }
  }

  back(){
    this.onBack.emit();
  }

  remove(){
    this.onRemove.emit(this.reservationValue.id);
  }

  getFlights() {
    this.flightService.getAll(null, null, null)
      .subscribe(
        res => {
          this._flights = res[0];

          if(!this.detail && this._flights.length > 0 && !this.detail) {
            this.reservationFG.get('flight').setValue(this._flights[0].id);
          }
        },
        err => {}
      );
  }


}