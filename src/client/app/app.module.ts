import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {DestinationModule} from "./destination/destination.module";
import {ReservationModule} from "./reservation/reservation.module";
import {InMemoryDataService} from "./in-memory-data.service";
import {InMemoryWebApiModule} from "angular2-in-memory-web-api";
import {FlightModule} from "./flight/flight.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
    RouterModule.forRoot(routes),
    AboutModule,
    HomeModule,
    DestinationModule,
    ReservationModule,
    FlightModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
