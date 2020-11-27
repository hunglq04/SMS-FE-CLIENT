import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';
import { splitClasses } from '@angular/compiler';

@Component({
  selector: 'app-booking-service',
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.css']
})
export class BookingServiceComponent implements OnInit {
  @Output() isSelected = new EventEmitter();
  services: Array<Service>;
  isSelect = [];
  servicesType = [];
  servicesId = [];
  indexService = [];
  isbookingServices = false;
  constructor(
    private serviceService: ServiceService
  ) { }

  async ngOnInit() {
    await this.getService();
    for (let i = 0; i <= this.services.length; i++) {
      this.isSelect.push(false);
    }
    if (sessionStorage.getItem('isSelectServices') != null) {
      this.isSelect = JSON.parse(sessionStorage.getItem('isSelectServices'));
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
    for (let j = 0; j <= this.servicesId.length; j++) {
      if (this.servicesId[j] == isSelectedService.id) {
        this.isSelect[index] = !this.isSelect[index];
        this.indexService.splice(j, 1);
        this.servicesType.splice(j, 1);
        this.servicesId.splice(j, 1);
        this.isbookingServices = true;
        break;
      }
      else {
        this.isbookingServices = false;
      }
    }
    if (!this.isbookingServices) {
      for (let i = 0; i <= this.servicesId.length; i++) {
        if (this.servicesType[i] != 'Chăm sóc da' && this.servicesType[i] == isSelectedService.serviceType) {
          this.isSelect[index] = true;
          this.isSelect[this.indexService[i]] = false;
          console.log(this.isSelect)
          this.servicesId[i] = isSelectedService.id;
          this.indexService[i] = index;
          this.isbookingServices = true;
          break;
        }
        else {
          this.isbookingServices = false;
        }
      }
    }
    if (!this.isbookingServices) {
      this.isSelect[index] = !this.isSelect[index];
      this.indexService.push(index);
      this.servicesType.push(isSelectedService.serviceType)
      this.servicesId.push(isSelectedService.id)
    }
    this.isSelected.emit(isSelectedService)
    sessionStorage.setItem('isSelectServices', JSON.stringify(this.isSelect));
  }
}
