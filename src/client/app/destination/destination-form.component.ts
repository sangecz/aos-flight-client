/**
 * Created by sange on 23/10/2016.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'destination-form',
  styleUrls: ['destination-form.component.css'],
  templateUrl: 'destination-form.component.html'
})
export class DestinationFormComponent {

  private destinationFG: FormGroup;
  private destinationValue: Destination;
  private detail: boolean = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set destination(val: Destination) {

    this.destinationValue = val || Object.assign({});

    if (val && val.name) {
      this.destinationFG.setValue({
        name: val.name
      });
    }
  }

  @Output() onDestinationChange = new EventEmitter<Destination>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();


  onSubmit() {
    if (this.destinationFG.valid) {
      this.destinationValue.name = this.destinationFG.value.name;

      this.onDestinationChange.emit(this.destinationValue);
      this.createForm();
    }
  }

  back() {
    this.onBack.emit();
  }

  remove() {
    this.onRemove.emit(this.destinationValue.id);
  }

  private createForm() {
    this.destinationFG = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
