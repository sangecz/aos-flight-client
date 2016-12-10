import { Route } from '@angular/router';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationComponent } from './reservation.component';
import { ReservationDetailResolve } from './reservation-detail-resolve.service';
import { ReservationResolve } from './reservation-resolve.service';

export const ReservationRoutes: Route[] = [
  {
    path: 'client/reservation',
    component: ReservationComponent,
    resolve: {
      obj: ReservationResolve
    }
  },
  {
    path: 'client/reservation/:id/:pwd',
    component: ReservationDetailComponent,
    resolve: {
      obj: ReservationDetailResolve
    }
  }
];
