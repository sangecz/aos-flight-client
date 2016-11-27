import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Config } from './../../shared/index';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  template: `
    <h1>{{appTitle}}</h1>
    <div class="more"></div>
  `,
  styleUrls: ['toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {

  appTitle: string;

  constructor() {
    this.appTitle = Config.APP_TITLE;
  }
}

