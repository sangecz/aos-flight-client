/**
 * Created by sange on 23/10/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

const emptyDestination: any = {
  name: null,
  lat: null,
  lon: null
};

@Component({
  moduleId: module.id,
  selector: 'destination-form',
  styleUrls: ['destination-form.component.css'],
  templateUrl: 'destination-form.component.html'
})
export class DestinationFormComponent implements OnInit {

  private destinationFG: FormGroup;
  private destinationValue: Destination;
  private detail: boolean = false;



  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.destinationFG = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lat: ['', [Validators.required]],
      lon: ['', [Validators.required]]
    });
  }

  @Input()
  set isDetail(val: boolean) {
    this.detail = val;
  }

  @Input()
  set destination(val: Destination) {
    this.destinationValue = val;

    if (val && val.name && val.lat && val.lon) {
      this.destinationFG.setValue({
        name: val.name,
        lat: val.lat,
        lon: val.lon
      });
    }
  }

  @Output() onDestinationChange = new EventEmitter<Destination>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.destinationFG.valid) {
      this.destinationValue.name = this.destinationFG.value.name;
      this.destinationValue.lat = this.destinationFG.value.lat;
      this.destinationValue.lon = this.destinationFG.value.lon;

      this.onDestinationChange.emit(this.destinationValue);
      this.createForm();
    }
  }

  back(){
    this.onBack.emit();
  }

  remove(){
    this.onRemove.emit(this.destinationValue.id);
  }


}