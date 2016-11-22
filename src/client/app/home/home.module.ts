import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { DestinationService } from '../shared/destination/index';
import { SubHomeComponent } from './sub-home.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, SubHomeComponent],
  exports: [HomeComponent, SubHomeComponent],
  providers: [DestinationService]
})
export class HomeModule { }
