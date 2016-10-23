import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { DestinationRoutes } from './destination/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...DestinationRoutes
];
