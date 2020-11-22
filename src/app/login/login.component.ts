import { Component, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';
import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { RegistRequest } from '../model/registRequest.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  @Input()
  username: string;
  @Input()
  password: string;
  loginForm: FormGroup;
  isShowError = false;
  user: SocialUser;
  loggedIn: boolean;
  constructor(
    private loginService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private authService: SocialAuthService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.loginForm.setValue({
      username: changes.username.currentValue,
      password: changes.password.currentValue
    })
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [this.username, Validators.required],
      password: [this.password, Validators.required]
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user != null) {
        let request = new RegistRequest();
        request.username = user.email || 'facebook-' + user.id;
        request.password = 'social-' + user.id;
        request.name = user.name;
        this.loginService.loginSocial(request)
          .then(res => window.location.href = '/')
          .catch(err => console.log(err));
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.isShowError = true;
      return;
    }
    this.loginService.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .then(res => {
        if (localStorage.getItem('test') == null) {
          window.location.href = window.location.href;
        }
        else {
          sessionStorage.setItem('isBookingLogin', 'true');
          window.location.href = window.location.href;
          localStorage.removeItem('test');
        }
      }).catch(err => {
        if (err.status) {
          this.isShowError = true;
        }
      })
  }
}
