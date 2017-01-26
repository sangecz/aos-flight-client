import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ReservationModule } from './reservation/reservation.module';
import { FlightModule } from './flight/flight.module';
import { DestinationModule } from './destination/destination.module';
import { appState } from './app.state';
import { ServiceLocator } from './shared/service-locator';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
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
  constructor(private injector: Injector) {
    /**
     * holder of the Injector for injecting Services,
     * usage: DI in parent classes' constructors,
     * simply: to be able to call super() (without any parameters) in child's constructor
     * instead of providing services to parent
     * @see BaseComponent is parent and other extending components are its children
     */
    ServiceLocator.injector = this.injector;
  }
}
