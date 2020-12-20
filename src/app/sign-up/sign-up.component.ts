import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistRequest } from '../model/registRequest.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registForm: FormGroup;
  request = new RegistRequest();
  @Output()
  signUp = new EventEmitter<{username: string, password: string}>();

  constructor(
    private registService: AuthenticationService,
    private fb: FormBuilder)
    { }

  ngOnInit(): void {
    this.registForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkPassword: ['', Validators.required]
    });
  }

  registAccount() {
    if (this.registForm.invalid) {
      alert("invalid form");
      return;
    }
    if (this.registForm.get("password").value != this.registForm.get("checkPassword").value) {
      alert("OK");
      return;
    }
    console.log(this.registForm);
    this.request.address = this.registForm.get("address").value;
    this.request.name = this.registForm.get("name").value;
    this.request.password = this.registForm.get("password").value;
    this.request.phone = this.registForm.get("phone").value;
    this.request.username = this.registForm.get("username").value;
    this.registService.registAccount(this.request)
      .then(() => this.signUp.emit({username: this.request.username, password: this.request.password}))
      .catch(err => alert("Có lỗi xảy ra vui lòng thử lại!"));
  }

}
