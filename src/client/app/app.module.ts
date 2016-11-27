import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ReservationModule } from './reservation/reservation.module';
import { FlightModule } from './flight/flight.module';
import { DestinationModule } from './destination/destination.module';
import { appState } from './app.state';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AboutModule,
    HomeModule,
    DestinationModule,
    ReservationModule,
    FlightModule,
    SharedModule.forRoot(),
    StoreModule.provideStore(appState),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
  bootstrap: [AppComponent]

})

export class AppModule {
}
