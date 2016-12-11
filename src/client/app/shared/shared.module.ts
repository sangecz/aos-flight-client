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
import { SortService } from './forms/sort/sort.service';
import { PaginationComponent } from './forms/pagination/pagination.component';
import { AuthService } from './auth/auth.service';
import { HttpClientService } from './http-client/http-client.service';
import { StoreService } from './util/store.service';
import { UserSwitchComponent } from './user-switch/user-switch.component';
import { PasswordComponent } from './forms/password.component';
import { PrintButtonComponent } from './forms/print-btn.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';

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
    LoadingComponent,
    PasswordComponent,
    PrintButtonComponent,
    UserSwitchComponent,
    ToolbarComponent,
    NavbarComponent,
    PaginationComponent
  ],
  exports: [
    LoadingComponent,
    PasswordComponent,
    PrintButtonComponent,
    UserSwitchComponent,
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
        LoadingService,
        DestinationService,
        ReservationService,
        FlightService,
        SortService,
        AuthService,
        HttpClientService,
        StoreService
      ]
    };
  }
}
