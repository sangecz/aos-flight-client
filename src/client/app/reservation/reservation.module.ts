import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ReservationFormComponent } from './reservation-form.component';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationComponent } from './reservation.component';
import { ReservationListComponent } from './reservation-list.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [ReservationComponent, ReservationFormComponent, ReservationDetailComponent, ReservationListComponent],
  exports: [ReservationComponent, ReservationFormComponent, ReservationDetailComponent, ReservationListComponent],
  providers: []
})
export class ReservationModule {
}
