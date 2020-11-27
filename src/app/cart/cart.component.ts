import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  products: Product[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    await this.getProduct();
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        var item: Item = {
          product: this.find(id),
          quantity: 1
        };
        console.log(item)
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }
  getProduct() {
    return this.productService.getProduct()
      .then(res => {
        this.products = res;
      })
  }
  find(id: number): Product {
    return this.products[this.getSelectedIndex(id)];
  }
  getSelectedIndex(id: number) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }
  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

	changeQuantity(quantity, changedQuantityId) {
		console.log('event: ', quantity);
		console.log('change id: ', changedQuantityId);
		var changedQuantity = parseInt(quantity.target.value);
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		this.items;
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			if (item.product.id == changedQuantityId) {
				item.quantity = changedQuantity;
				cart.splice(i, 1);
				cart.push(JSON.stringify(item));
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}

  remove(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }
}
