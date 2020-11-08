import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLogin = true;
  isShowLogin = false;
  user = {
    token: '',
    roles: ''
  };

  checkLoggedAccount(user) {
    if (user === null) {
      return false;
    }
    return true;
  }
  constructor() { }

  // bookingclick(){
  //   localStorage.setItem('test', 'test');
  //   console.log(localStorage.getItem('test'));
  // }

  ngOnInit(): void {
    if (this.checkLoggedAccount(localStorage.getItem('user'))) {
      this.isLogin = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isShowLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }
}
