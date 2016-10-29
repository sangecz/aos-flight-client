import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import { SharedModule } from '../shared/shared.module';
import { DestinationComponent } from './destination.component';
import {DestinationFormComponent} from "./destination-form.component";
import {DestinationDetailComponent} from "./destination-detail.component";

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [DestinationComponent, DestinationFormComponent, DestinationDetailComponent],
  exports: [DestinationComponent, DestinationFormComponent, DestinationDetailComponent],
  providers: []
})
export class DestinationModule { }
