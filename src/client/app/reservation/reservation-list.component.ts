/**
 * Created by sange on 27/11/2016.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { reservationStates } from './reservation-states';

@Component({
  moduleId: module.id,
  selector: 'reservation-list',
  template: `
    <div *ngIf="visible">
      <h2>Reservation list</h2>
      <table class="list">
        <tr>
          <th>Flight</th>
          <th>Seats</th>
          <th>Created</th>
          <th>Password</th>
          <th>State</th>
          <th>eTicket</th>
        </tr>
        <tr *ngFor="let reservation of reservations" (click)="onReservationSelected.emit(reservation)">
          <td>{{reservation.flightName}}</td>
          <td class="center">{{reservation.seats}}</td>
          <td>{{reservation.created | date:'yyyy-MM-ddTHH:mm:ss Z'}}</td>
          <td><aos-password [value]="reservation.password"></aos-password></td>
          <td>{{reservation.state}}</td>
          <td class="center">
            <print-btn 
              [hidden]="reservation.state !== paidState"
              (onPrintClicked)="downloadTicket(reservation)">
            </print-btn>
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: [` 
    td, th { padding: 4px 8px; }
    td { height: 36px; }
    .center { text-align: center; }  
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationListComponent {

  paidState = reservationStates.PAID;
  @Input() visible: boolean;
  @Input() reservations: Reservation[];
  @Output() onReservationSelected = new EventEmitter<Reservation>();
  @Output() onDownloadTicket = new EventEmitter<Reservation>();

  downloadTicket(reservation: Reservation) {
    if(reservation.state === this.paidState) {
      this.onDownloadTicket.emit(reservation);
    }
  }

}
