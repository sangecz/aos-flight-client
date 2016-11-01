import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ToolbarComponent} from './toolbar/index';
import {NavbarComponent} from './navbar/index';
import {DestinationService} from './destination/index';
import {ReservationService} from "./reservation/reservation.service";
import {FlightService} from "./flight/flight.service";
import {SortService} from "./util/sort.service";
import {PaginationComponent} from "./pagination/pagination.component";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    PaginationComponent
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    PaginationComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DestinationService,
        ReservationService,
        FlightService,
        SortService
      ]
    };
  }
}
