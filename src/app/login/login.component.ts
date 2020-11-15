import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';
import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
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
        let role = this.loginService.extractUserRole(res.roles);
        if (role) {
          if (localStorage.getItem('test') == null) {
            window.location.href = '/';
          }
          else
          {
            window.location.href
            localStorage.removeItem('test');
          }
        } else {
          this.isShowError = true;
        }
      }).catch(err => {
        if (err.status) {
          this.isShowError = true;
        }
      })
  }
}
