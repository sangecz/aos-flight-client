import { Route } from '@angular/router';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationComponent } from './reservation.component';

export const ReservationRoutes: Route[] = [
  {
    path: 'client/reservation',
    component: ReservationComponent
  },
  {
    path: 'client/reservation/:id',
    component: ReservationDetailComponent
  }
];
