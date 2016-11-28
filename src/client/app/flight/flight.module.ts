import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FlightFormComponent } from './flight-form.component';
import { FlightDetailComponent } from './flight-detail.component';
import { FlightComponent } from './flight.component';
import { DepartureFilterComponent } from './departure-filter.component';
import { FlightListComponent } from './flight-list.component';
import { FlightDetailResolve } from './flight-detail-resolve.service';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [FlightComponent, FlightFormComponent, FlightDetailComponent, DepartureFilterComponent, FlightListComponent],
  exports: [FlightComponent, FlightFormComponent, FlightDetailComponent, DepartureFilterComponent, FlightListComponent],
  providers: [FlightDetailResolve]
})
export class FlightModule {
}
