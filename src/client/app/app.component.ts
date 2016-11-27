import { Component, OnInit } from '@angular/core';

import { Config } from './shared/index';
import './operators';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  template: `
    <sd-toolbar></sd-toolbar>
    <sd-navbar></sd-navbar>

    <router-outlet></router-outlet>
    
    <ng2-toasty></ng2-toasty>
  `
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor() {
    console.log('Environment config', Config);
  }
}


