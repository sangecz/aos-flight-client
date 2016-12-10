import { Route } from '@angular/router';
import { FlightDetailComponent } from './flight-detail.component';
import { FlightComponent } from './flight.component';
import { FlightDetailResolve } from './flight-detail-resolve.service';
import { FlightResolve } from './flight-resolve.service';

export const FlightRoutes: Route[] = [
  {
    path: 'client/flight',
    component: FlightComponent,
    resolve: {
      destinations: FlightResolve
    }
  },
  {
    path: 'client/flight/:id',
    component: FlightDetailComponent,
    resolve: {
      obj: FlightDetailResolve
    }

  }
];
