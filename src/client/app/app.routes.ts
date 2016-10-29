import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { DestinationRoutes } from './destination/index';
import {ReservationRoutes} from "./reservation/reservation.routes";
import {FlightRoutes} from "./flight/flight.routes";

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...DestinationRoutes,
  ...ReservationRoutes,
  ...FlightRoutes
];
