import { Route } from '@angular/router';
import { DestinationComponent } from './index';
import {DestinationDetailComponent} from "./destination-detail.component";

export const DestinationRoutes: Route[] = [
  {
    path: 'client/destination',
    component: DestinationComponent
  },
  {
    path: 'client/destination/:id',
    component: DestinationDetailComponent
  }
];
