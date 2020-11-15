import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('tabs', {static: false}) tabs;
  isLogin = true;
  username = '';
  password = '';
  isBooking = true;

  constructor(
    private router: Router,

  ) { }
  checkLoggedAccount(username) {
    if (username === null) {
      return false;
    }
    return true;
  }
  signOutClick() {
    sessionStorage.removeItem('username');
    window.location.reload();
  }
  btnLogin() {
    this.tabs.realignInkBar();
    this.isBooking = false;
    localStorage.removeItem('test');
  }
  bookingclick() {
    localStorage.setItem('test', 'test');
    console.log(localStorage.getItem('test'));
    this.isBooking = true;
  }

  ngOnInit() {
    if (this.checkLoggedAccount(sessionStorage.getItem('username'))) {
      this.isLogin = true;
      this.username = sessionStorage.getItem('username');
    }
    else {
      this.isLogin = false;
    }
  }

  signUp(loginInfo) {
    console.log(loginInfo);
    this.tabs.selectedIndex = 0;
    this.username = loginInfo.username;
    this.password = loginInfo.password;
  }

}
