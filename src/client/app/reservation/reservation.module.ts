import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ReservationFormComponent } from './reservation-form.component';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationComponent } from './reservation.component';
import { ReservationListComponent } from './reservation-list.component';
import { ReservationDetailResolve } from './reservation-detail-resolve.service';
import { ReservationResolve } from './reservation-resolve.service';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [ReservationComponent, ReservationFormComponent, ReservationDetailComponent, ReservationListComponent],
  exports: [ReservationComponent, ReservationFormComponent, ReservationDetailComponent, ReservationListComponent],
  providers: [ReservationDetailResolve, ReservationResolve]
})
export class ReservationModule {
}
