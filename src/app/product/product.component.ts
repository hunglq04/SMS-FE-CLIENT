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
  searchText;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    return this.productService.getProduct()
      .then(res => {
        this.products = res;
      })
  }

}
