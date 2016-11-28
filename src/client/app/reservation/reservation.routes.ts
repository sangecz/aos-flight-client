import { Route } from '@angular/router';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationComponent } from './reservation.component';
import { ReservationDetailResolve } from './reservation-detail-resolve.service';

export const ReservationRoutes: Route[] = [
  {
    path: 'client/reservation',
    component: ReservationComponent
  },
  {
    path: 'client/reservation/:id',
    component: ReservationDetailComponent,
    resolve: {
      obj: ReservationDetailResolve
    }
  }
];
