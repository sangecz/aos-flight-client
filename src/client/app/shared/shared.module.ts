import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { DestinationService } from './destination/index';
import { ReservationService } from './reservation/reservation.service';
import { FlightService } from './flight/flight.service';
import { SortService } from './sort/sort.service';
import { PaginationComponent } from './pagination/pagination.component';
import { AuthService } from './auth/auth.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ToastyModule.forRoot(),
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
    RouterModule,
    ToastyModule
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
        SortService,
        AuthService
      ]
    };
  }
}
