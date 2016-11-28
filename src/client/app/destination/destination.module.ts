import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DestinationComponent } from './destination.component';
import { DestinationFormComponent } from './destination-form.component';
import { DestinationDetailComponent } from './destination-detail.component';
import { DestinationListComponent } from './destination-list.component';
import { DestinationDetailResolve } from './destination-detail-resolve.service';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [DestinationComponent, DestinationFormComponent, DestinationDetailComponent, DestinationListComponent],
  exports: [DestinationComponent, DestinationFormComponent, DestinationDetailComponent, DestinationListComponent],
  providers: [DestinationDetailResolve]
})
export class DestinationModule {
}
