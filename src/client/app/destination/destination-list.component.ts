/**
 * Created by sange on 22/11/2016.
 */

import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'destination-list',
  template: ` <h2>Destination list</h2>
              <table>
                <tr>
                  <th (click)="changeSort()" [ngClass]="sortClass">Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
                <tr *ngFor="let destination of destinations" (click)="selectDestination(destination)">
                  <td>{{destination.name}}</td>
                  <td>{{destination.lat}}</td>
                  <td>{{destination.lon}}</td>
                </tr>
              </table>`,
  styles: [`
      tr {
        cursor: pointer;
      }
      
      tr:not(:first-child):hover {
        background-color: #bbb;
      }
      
      tr:nth-child(odd) {
        background-color: #efefef;
      }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationListComponent {

  @Output() destinationSelected = new EventEmitter<Destination>();
  @Output() sortChanged = new EventEmitter<void>();
  @Input() destinations: Destination[];
  @Input() sortClass: string;

  changeSort() {
    this.sortChanged.emit();
  }

  selectDestination(dest: Destination) {
    this.destinationSelected.emit(dest);
  }

}
