import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';
import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm: FormGroup;
  isShowError = false;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private loginService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private authService: SocialAuthService
  ){}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }

  signOut(): void {
    this.authService.signOut();
  }

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


  onLogin() {
    if (this.loginForm.invalid) {
      this.isShowError = true;
      return;
    }
    this.loginService.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .then(res => {
          let role = this.loginService.extractUserRole(res.roles);
          if (role) {
            this.router.navigateByUrl('/');
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
