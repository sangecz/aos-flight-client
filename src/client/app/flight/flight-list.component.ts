/**
 * Created by sange on 27/11/2016.
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'flight-list',
  template: `
    <table class="list">
      <tr>
        <th (click)="onChangeNameSort.emit()" [ngClass]="nameSortClass">Name</th>
        <th (click)="onChangeDepartureSort.emit()" [ngClass]="[departureSortClass, filterClass]">Departure</th>
        <th>Distance</th>
        <th>Seats</th>
        <th>Price</th>
        <th>From</th>
        <th>To</th>
      </tr>
      <tr *ngFor="let flight of flights" (click)="onFlightSelected.emit(flight)">
        <td>{{flight.name}}</td>
        <td>{{flight.dateOfDeparture | date:'yyyy-MM-ddTHH:mm:ss Z'}}</td>
        <td>{{flight.distance}} km</td>
        <td class="center">{{flight.seats}}</td>
        <td>{{flight.price}} Kč</td>
        <td>{{flight.fromName}}</td>
        <td>{{flight.toName}}</td>
      </tr>
    </table>
  `,
  styles: [` 
    td, th { padding: 4px 8px; } 
    .center { text-align: center; } 
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent {

  @Input() flights: Flight[];
  @Input() nameSortClass: string;
  @Input() departureSortClass: string;
  @Input() filterClass: string;
  @Output() onFlightSelected = new EventEmitter<Flight>();
  @Output() onChangeNameSort = new EventEmitter<void>();
  @Output() onChangeDepartureSort = new EventEmitter<void>();
}
