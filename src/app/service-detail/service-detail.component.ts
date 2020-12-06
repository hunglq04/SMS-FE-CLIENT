import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { Service } from '../model/service.model';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getServiceId();
  }

  getServiceId() {
    var id
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    })
    return this.serviceService.getServiceId(id)
      .then(res => {
       this.service = res;
       console.log(this.service)
      })
  }
}
