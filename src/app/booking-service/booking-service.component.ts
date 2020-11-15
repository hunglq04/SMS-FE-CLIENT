import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-booking-service',
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.css']
})
export class BookingServiceComponent implements OnInit {
  @Output() isSelected = new EventEmitter();
  services: Array<Service>;
  bookingservices = [];
  isSelect = [];
  constructor(
    private serviceService: ServiceService
  ) { }

  async ngOnInit() {
    await this.getService();
    for (let i = 0; i < this.services.length; i++) {
      this.isSelect.push(false);
    }
  }
  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView({ behavior: 'smooth' });

  }
  getService() {
    return this.serviceService.getService()
      .then(res => {
        this.services = res;
      })
  }
  pickService(isSelectedService, index) {
    var select = true;
    for (let i = 0; i < this.bookingservices.length; i++) {
      if (isSelectedService == this.bookingservices[i]) {
        select = false;
      }
    }
    console.log(this.isSelect)
    if (this.isSelect[index] === false) {
      for (let i = 0; i < this.bookingservices.length; i++) {
        if (this.bookingservices[i] == isSelectedService) {
          this.bookingservices.splice(i, 1);
        }
      }
    } else if (select) {
      {
        if (index >= 0 && index <= 6) {
          for (let j = 0; j <= 6; j++) {
            if (this.isSelect[j] == true && j != index) {
              this.bookingservices.splice(j, 1);
              this.isSelect[j] = false;
            }
          }
          this.bookingservices.push(isSelectedService)

        }
        else {
          this.bookingservices.push(isSelectedService)
        }
      }
    }
    this.isSelected.emit(isSelectedService)
    console.log(this.bookingservices)
  }
  checkisSeclect(i) {
    // if (i >= 0 && i <= 6) {
    //   for (let j = 0; j <= 6; j++) {
    //     if (this.isSelect[j] == true && j != i) {
    //       this.isSelect[j] = false;
    //     }
    //   }
    //   this.isSelect[i] = !this.isSelect[i];
    // }
    // else {
    //   this.isSelect[i] = !this.isSelect[i];
    // }
    this.isSelect[i] = !this.isSelect[i];
  }
}
