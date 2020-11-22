import { Component, OnInit } from '@angular/core';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<Product>
  isProductType = true;
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
    // for (let i = 0; i <= this.products.length; i++) {
    //   if (this.products[i].productType == 'Tạo kiểu tóc') {
    //     this.isProductType = false;
    //   } else if (this.products[i].productType == 'Chăm sóc tóc') {
    //     this.isProductType = false;
    //   } else if (this.products[i].productType == 'Chăm sóc da') {
    //     this.isProductType = false;
    //   } else if (this.products[i].productType == 'Chăm sóc cơ thể') {
    //     this.isProductType = false;
    //   } else if (this.products[i].productType == 'Chăm sóc râu') {
    //     this.isProductType = false
    //   }
    // }
    for (let i = 0; i <= this.products.length; i++) {
      if (this.products[i].productType == 'Chăm sóc da') {
        this.isProductType = false;
      }
    }
  }

  getProduct() {
    return this.productService.getProduct()
      .then(res => {
        this.products = res;
      })
  }

}
