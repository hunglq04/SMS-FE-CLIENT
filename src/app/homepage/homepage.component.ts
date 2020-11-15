import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLogin = true;
  isShowLogin = false;
  services: Array<Service>;

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('username') != null) {
      this.isLogin = true;
      this.isShowLogin = true;
    }
    else {
      this.isLogin = false;
    }
    this.getService();
  }

  getService() {
    return this.serviceService.getService()
      .then(res => {
          this.services = res;
      })
  }
}
