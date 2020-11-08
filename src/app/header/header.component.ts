import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = true;
  constructor(
    private router: Router,

  ) { }
  isBooking = true;
  username = '';
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
      console.log('Dang nhap thanh cong' , this.username);
    }
    else {
      this.isLogin = false;
      console.log('DNTB');
    }
  }

}
