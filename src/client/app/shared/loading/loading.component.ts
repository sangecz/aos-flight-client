/**
 * Created by sange on 11/12/2016.
 */

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'aos-loading',
  template: `
    <div class="showbox">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
  `,
  styleUrls: ['loading.component.css']
})
export class LoadingComponent {}
