import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any
  quantity = 1;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getProductId();
  }
  getProductId() {
    var id
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    })
    return this.productService.getProductId(id)
      .then(res => {
        this.product = res;
      })
  }
  minusQuanlitiClick(quantity) {
    quantity -= 1;
    this.quantity = quantity;
  }
  plusQuanlitiClick(quantity) {
    quantity += 1;
    this.quantity = quantity;
  }
}
