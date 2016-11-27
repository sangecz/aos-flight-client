/**
 * Created by sange on 22/11/2016.
 */

import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'destination-list',
  template: ` <h2>Destination list</h2>
              <table class="list">
                <tr>
                  <th (click)="onSortChanged.emit()" [ngClass]="sortClass">Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
                <tr *ngFor="let destination of destinations" (click)="onDestinationSelected.emit(destination)">
                  <td>{{destination.name}}</td>
                  <td>{{destination.lat}}</td>
                  <td>{{destination.lon}}</td>
                </tr>
              </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationListComponent {

  @Input() destinations: Destination[];
  @Input() sortClass: string;
  @Output() onDestinationSelected = new EventEmitter<Destination>();
  @Output() onSortChanged = new EventEmitter<void>();

}
