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
                  <th (click)="changeSort()" [ngClass]="getSortClass()">Name</th>
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

  /**
   * 0 == no sort
   * 1 == asc
   * 2 == desc
   */
  private orderValue: number = 0;

  @Output()
  destinationSelected = new EventEmitter<Destination>();

  @Output()
  sortChanged = new EventEmitter<void>();

  @Input()
  destinations: Destination[];

  constructor(private sortService: SortService) {
  }

  ngOnInit() {
  }

  changeSort() {
    this.orderValue = (this.orderValue + 1) % 3;
    this.sortService.changeOrderFor(sortNameField, this.orderValue);
    this.sortChanged.emit();
  }

  getSortClass(): string {
    return this.sortService.getSortFor(sortNameField).order ? this.sortService.getSortFor(sortNameField).order : ''
  }

  selectDestination(dest: Destination) {
    this.destinationSelected.emit(dest);
  }

}