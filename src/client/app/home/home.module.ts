import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { DestinationService } from '../shared/destination/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [DestinationService]
})
export class HomeModule { }
