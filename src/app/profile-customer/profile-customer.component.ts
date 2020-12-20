import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.css']
})
export class ProfileCustomerComponent implements OnInit {
  account: any;
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.account = JSON.parse(sessionStorage.getItem('account'));
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.profileForm.controls['email'].setValue(this.account.email);
    this.profileForm.controls['name'].setValue(this.account.name);
    this.profileForm.controls['address'].setValue(this.account.addres);
    this.profileForm.controls['phone'].setValue(this.account.phone);
    this.profileForm.controls['password'].setValue(this.account.password);
  }
}
