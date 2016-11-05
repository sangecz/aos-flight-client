import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import { SharedModule } from '../shared/shared.module';
import {FlightFormComponent} from "./flight-form.component";
import {FlightDetailComponent} from "./flight-detail.component";
import {FlightComponent} from "./flight.component";
import {DepartureFilterComponent} from "./departure-filter.component";

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [FlightComponent, FlightFormComponent, FlightDetailComponent, DepartureFilterComponent],
  exports: [FlightComponent, FlightFormComponent, FlightDetailComponent, DepartureFilterComponent],
  providers: []
})
export class FlightModule { }
