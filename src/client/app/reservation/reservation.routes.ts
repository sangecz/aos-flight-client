import { Route } from '@angular/router';
import {ReservationDetailComponent} from "./reservation-detail.component";
import {ReservationComponent} from "./reservation.component";

export const ReservationRoutes: Route[] = [
  {
    path: 'reservation',
    component: ReservationComponent
  },
  {
    path: 'reservation/:id',
    component: ReservationDetailComponent
  }
];
