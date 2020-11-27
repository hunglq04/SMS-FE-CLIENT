import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Service } from '../model/service.model';
import { Province } from '../model/province.model';
import { Salon } from '../model/salon.model';
import { Product } from '../model/product.model';

import { ServiceService } from '../service/service.service';
import { SalonService } from '../service/salon.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  provinceForm: FormGroup;
  provinces: Array<Province>;
  filteredProvinces: Observable<Array<Province>>;
  isLogin = true;
  isShowLogin = false;
  services: Array<Service>;
  salons: Array<Salon>;
  products: Array<Product>

  provinceName: '';
  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private salonService: SalonService,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.provinceForm = this.fb.group({
      province: [''],
    });
    if (sessionStorage.getItem('username') != null) {
      this.isLogin = true;
      this.isShowLogin = true;
    }
    else {
      this.isLogin = false;
    }
    this.getService();
    await this.getProvince();
    this.getSalon();
    this.getProduct();

  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  filterProvinces(name: string): Province[] {
    const filterValue = name.toLowerCase();
    return this.provinces.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  getProvinceId(provinceName) {
    this.provinceName = provinceName
  }

  getService() {
    return this.serviceService.getService()
      .then(res => {
        this.services = res;
      })
  }

  getProduct() {
    return this.productService.getProduct()
      .then(res => {
        this.products = res;
        this.products.length = 4;
      })
  }

  getProvince() {
    return this.salonService.getProvince()
      .then(res => {
        this.provinces = res;
        this.filteredProvinces = this.provinceForm.controls['province'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterProvinces(name) : this.provinces.slice())
          );
      })
  }
  getSalon() {
    return this.salonService.getSalon()
      .then(res => {
        this.salons = res;
      })
  }
  pickSalonHomePage(salon) {
    sessionStorage.setItem('selectSalonHome', JSON.stringify(salon));
  }
}
