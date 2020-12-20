import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { Item } from '../model/item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  isCheckout = false;
  products: Product[]
  checkout = {
    email: '',
    name: '',
    phone: '',
    address: '',
    cartInfo: []
  }
  checkoutForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
    await this.getProduct();
    this.activatedRoute.params.subscribe(params => {
      // var id = params['id'];
      var id = JSON.parse(sessionStorage.getItem('idProduct'));
      if (id) {
        let quantity = JSON.parse(sessionStorage.getItem('quantityProduct'));
        if (quantity > 1) {
          var item: Item = {
            product: this.find(id),
            quantity: parseInt(quantity)
          };
        }
        else {
          sessionStorage.removeItem('quantityProduct');
          var item: Item = {
            product: this.find(id),
            quantity: 1
          };
        }
        if (sessionStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          sessionStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(sessionStorage.getItem('cart'));
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
            sessionStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            let quantity = JSON.parse(sessionStorage.getItem('quantityProduct'));
            if (quantity > 1) {
              item.quantity += parseInt(quantity);
              sessionStorage.removeItem('quantityProduct');
            }
            else {
              item.quantity += 1;
            }
            cart[index] = JSON.stringify(item);
            sessionStorage.setItem("cart", JSON.stringify(cart));
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
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
    sessionStorage.setItem('items', JSON.stringify(this.items));
    sessionStorage.setItem('total', JSON.stringify(this.total));
  }

  changeQuantity(quantity, changedQuantityId) {
    console.log('event: ', quantity);
    console.log('change id: ', changedQuantityId);
    var changedQuantity = parseInt(quantity.target.value);
    let cart: any = JSON.parse(sessionStorage.getItem('cart'));
    this.items;
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.product.id == changedQuantityId) {
        item.quantity = changedQuantity;
        cart.splice(i, 1);
        // cart.push(JSON.stringify(item));
        cart.splice(i, 0, JSON.stringify(item));
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  remove(id: number): void {
    let cart: any = JSON.parse(sessionStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }
  checkOut() {
    this.isCheckout = true;
  }
}
