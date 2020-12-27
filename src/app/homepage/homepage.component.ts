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

  imageRanking = [];
  random = [];
  provinceName: '';
  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private salonService: SalonService,
    private productService: ProductService,
    private router: Router
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
    this.imageRanking.push(
      { image: 'https://i.pinimg.com/originals/97/1c/e3/971ce3c39963e0bce23b814ead4c2d98.jpg', like: '220' },
      { image: 'https://i.pinimg.com/736x/9d/87/06/9d870638a811f4cdf1f0da26de4d3d78.jpg', like: '200' },
      { image: 'https://i.pinimg.com/564x/5a/77/94/5a7794ce82d66369dc61c9f28d87a8df.jpg', like: '189' },
      { image: 'https://i.pinimg.com/originals/c6/44/9b/c6449bc5ac6e7e772ff84bc90a9d0bbb.jpg', like: '172' }
    )
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
  selectProduct(id) {
    sessionStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/cart');
  }
}
