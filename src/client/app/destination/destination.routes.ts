import { Route } from '@angular/router';
import { DestinationComponent } from './index';
import {DestinationDetailComponent} from "./destination-detail.component";

export const DestinationRoutes: Route[] = [
  {
    path: 'destination',
    component: DestinationComponent
  },
  {
    path: 'destination/:id',
    component: DestinationDetailComponent
  }
];
