/**
 * Created by sange on 22/11/2016.
 */

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { sortNameField } from '../shared/sort/sort.reducer';
import { Sort } from '../shared/sort/sort';
import { SortService } from '../shared/sort/sort.service';

@Component({
  moduleId: module.id,
  selector: 'destination-list',
  template: ` <h2>Destination list</h2>
              <table>
                <tr>
                  <th (click)="changeSort()" [ngClass]="getSortClass() | async">Name</th>
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
  `]
})
export class DestinationListComponent implements OnInit {

  @Output()
  destinationSelected = new EventEmitter<Destination>();

  @Output()
  sortChanged = new EventEmitter();

  @Input()
  destinations: Destination[];

  constructor(private sortService: SortService) {
  }

  ngOnInit() {
  }

  changeSort() {
    this.sortService.changeSort();
    this.sortChanged.emit();
  }

  getSortClass() {
    return this.sortService.getSortString();
  }

  selectDestination(dest: Destination) {
    this.destinationSelected.emit(dest);
  }

}