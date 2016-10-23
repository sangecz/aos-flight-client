import { Component } from '@angular/core';

import { Config } from './../../shared/index';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {

  appTitle: string;

  constructor(){
    this.appTitle = Config.APP_TITLE;
  }
}

