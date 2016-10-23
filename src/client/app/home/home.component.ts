import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * DestinationService.
   *
   * @param {DestinationService} nameListService - The injected DestinationService.
   */
  constructor(public nameListService: DestinationService) {}

  /**
   * Get the destinations OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the destinationService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error =>  this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the destinations array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement destinationService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
