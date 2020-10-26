import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Stepper from 'bs-stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProvinceService } from '../service/province-service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [ProvinceService]
})
export class BookingComponent implements OnInit {
  private stepper: Stepper;
  // Autocomplete
  myControl = new FormControl();
  options: any[];
  filteredOptions: Observable<string[]>;
  constructor(
    private provinceService: ProvinceService,
    private router: Router
  ) {
    this.provinceService.getAllProvince().then(res => {
      this.options = Object.values(res);
      console.log(this.options);
    }).catch(err => console.log(err));
  }
  previous() {
    this.stepper.previous();
  }
  next() {
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    // Autocomplete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
