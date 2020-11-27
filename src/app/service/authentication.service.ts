import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegistRequest } from '../model/registRequest.model';

export class LoginResponse {
  constructor(
    public username: string,
    public token: string,
    public roles: Array<string>,
    public name: string,
    public avatar: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  account: Account;
  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate(username, password) {
    return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/login`, { username, password })
      .toPromise()
      .then(res => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', 'Bearer ' + res.token);
        sessionStorage.setItem('name', res.name)
        sessionStorage.setItem('avatar', res.avatar)
        return res;
      })
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }

  registAccount(request: RegistRequest) {
    return this.httpClient.post<void>(`${environment.baseUrl}/register`, request)
      .toPromise()
  }

  loginSocial(request: RegistRequest) {
    return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/login/social`, request)
      .toPromise()
      .then(res => {
        sessionStorage.setItem('name', res.name)
        sessionStorage.setItem('avatar', res.avatar)
        sessionStorage.setItem('username', request.username);
        sessionStorage.setItem('token', 'Bearer ' + res.token);
        return res;
      })
  }

  extractUserRole(roles) {
    if (roles.includes(environment.ROLE_ADMIN)) {
      return environment.ROLE_ADMIN;
    } else if (roles.includes(environment.ROLE_MANAGER)) {
      return environment.ROLE_MANAGER
    } else if (roles.includes(environment.ROLE_CASHIER)) {
      return environment.ROLE_CASHIER
    } else if (roles.includes(environment.ROLE_STYLIST)) {
      return environment.ROLE_STYLIST
    } else {
      return "";
    }
  }


}
