import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = true;
  constructor(private router: Router) { }

  user = {
    username: '',
    token: '',
    roles: ''
  };

  checkLoggedAccount(user) {
    if (user === null) {
      return false;
    }
    return true;
  }
  signOutClick() {
    // this.socialAuth.signOut();
    // localStorage.removeItem("LoggedInAccount");
    // window.location.reload();
    localStorage.removeItem('username');
    window.location.reload();
  }

  ngOnInit() {
    if (this.checkLoggedAccount(localStorage.getItem('username'))) {
      this.isLogin = true;
      this.user = JSON.parse(localStorage.getItem('username'));
      console.log('Dung', localStorage.getItem('username'), this.user);
    }
    else {
      this.isLogin = false;
      console.log('sai');
    }
  }

}
