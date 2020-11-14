import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-booking-service',
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.css']
})
export class BookingServiceComponent implements OnInit {
  serviceFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    this.serviceFormGroup = this.fb.group({
    });
  }
  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
