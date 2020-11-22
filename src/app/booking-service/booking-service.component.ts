import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  bookingservices = [];
  isSelect = [];
  servicesType = [];
  servicesId = [];
  indexService = []
  isbookingServices = false;
  constructor(
    private serviceService: ServiceService
  ) { }

  async ngOnInit() {
    await this.getService();
    for (let i = 0; i <= this.services.length; i++) {
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
    if (!this.isbookingServices) {
      this.isSelect[index] = !this.isSelect[index];
      this.indexService.push(index);
      this.servicesType.push(isSelectedService.serviceType)
      this.servicesId.push(isSelectedService.id)

    }
    this.isSelected.emit(isSelectedService)
  }
}
