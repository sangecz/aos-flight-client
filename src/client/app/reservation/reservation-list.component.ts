/**
 * Created by sange on 27/11/2016.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
        </tr>
        <tr *ngFor="let reservation of reservations" (click)="onReservationSelected.emit(reservation)">
          <td>{{reservation.flightName}}</td>
          <td>{{reservation.seats}}</td>
          <td>{{reservation.created | date:'yyyy-MM-ddTHH:mm:ss Z'}}</td>
          <td>{{reservation.password}}</td>
          <td>{{reservation.state}}</td>
        </tr>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationListComponent {

  @Input() visible: boolean;
  @Input() reservations: Reservation[];
  @Output() onReservationSelected = new EventEmitter<Reservation>();

}
