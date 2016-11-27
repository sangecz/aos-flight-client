import { Route } from '@angular/router';
import { FlightDetailComponent } from './flight-detail.component';
import { FlightComponent } from './flight.component';

export const FlightRoutes: Route[] = [
  {
    path: 'client/flight',
    component: FlightComponent
  },
  {
    path: 'client/flight/:id',
    component: FlightDetailComponent
  }
];
