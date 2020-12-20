import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

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

  updateQuantity(value: number) {
    this.quantity = value;
  }

  minusQuanlitiClick(quantity) {
    quantity -= 1;
    this.quantity = quantity;
  }

  plusQuanlitiClick(quantity) {
    quantity += 1;
    this.quantity = quantity;
  }
  selectProduct(id) {
    sessionStorage.setItem('idProduct', id);
    sessionStorage.setItem('quantityProduct', JSON.stringify(this.quantity));
    this.router.navigateByUrl('/cart');
  }
}
