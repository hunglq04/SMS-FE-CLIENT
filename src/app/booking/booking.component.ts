import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { state } from '@angular/animations';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit {
  //Stepper Material
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;
  test = false;
  //Autocomplete
  constructor(
    private _formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    // Stepper Material
    this.firstFormGroup = this._formBuilder.group({
    });
    // if (this.test == true) {
    //   this.firstFormGroup = this._formBuilder.group({
    //   });
    // }
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
    })
  }

}
