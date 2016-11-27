import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  template: `<h1>AOS-Flight</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
