import { Route } from '@angular/router';
import {FlightDetailComponent} from "./flight-detail.component";
import {FlightComponent} from "./flight.component";

export const FlightRoutes: Route[] = [
  {
    path: 'flight',
    component: FlightComponent
  },
  {
    path: 'flight/:id',
    component: FlightDetailComponent
  }
];
