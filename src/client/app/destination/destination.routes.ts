import { Route } from '@angular/router';

import { DestinationComponent } from './index';
import { DestinationDetailComponent } from './destination-detail.component';
import { DestinationDetailResolve } from './destination-detail-resolve.service';

export const DestinationRoutes: Route[] = [
  {
    path: 'client/destination',
    component: DestinationComponent
  },
  {
    path: 'client/destination/:id',
    component: DestinationDetailComponent,
    resolve: {
      destination: DestinationDetailResolve
    }
  }
];
