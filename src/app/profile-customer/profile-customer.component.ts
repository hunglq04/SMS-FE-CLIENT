import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { NewCustomer } from '../model/new-cutstomer';
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
    private customerService: CustomerService
  ) { }
  async ngOnInit() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    })
    await this.getCustomer();
    console.log(this.account);
    this.profileForm.controls['email'].setValue(this.account.email);
    this.profileForm.controls['name'].setValue(this.account.name);
    this.profileForm.controls['address'].setValue(this.account.address);
    this.profileForm.controls['phone'].setValue(this.account.phoneNumber);
    this.profileForm.controls['password'].setValue(this.account.password);
  }
  async getCustomer(){
    await this.customerService.getCustomer()
    .then(res=>{
      this.account = res;

    })
  }
  updateInfo() {
    let customer = new NewCustomer(
      this.profileForm.get('name').value,
      this.profileForm.get('address').value,
      this.profileForm.get('phone').value,
    )
    this.customerService.putInfo(customer)
      .then(() => {
        alert("Cập nhật thành công");
      })
  }
}
