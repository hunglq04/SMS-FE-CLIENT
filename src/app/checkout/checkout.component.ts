import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model/oder.model'
import { OrderService } from '../service/order.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order = new Order();
  isCheckout = false;
  isLogin = false;
  checkoutForm: FormGroup;
  account: any;
  items
  total
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
    if (sessionStorage.getItem('username') == null) {
      this.isLogin = true;
    }
    else {
      this.account = JSON.parse(sessionStorage.getItem('account'));
      this.isLogin = false;
      this.checkoutForm.setValue({
        name: this.account.name,
        address: this.account.address,
        phone: this.account.phone,
        email: this.account.email
      })
    }
    this.items = JSON.parse(sessionStorage.getItem('items'));
    this.total = JSON.parse(sessionStorage.getItem('total'));
  }
  formatDate(date) {
    if (!date) return "";
    return date.split("/").reverse().join("-");
  }
  checkOut() {
    this.isCheckout = true;
    this.order.email = this.checkoutForm.get('email').value;
    this.order.name = this.checkoutForm.get('name').value;
    this.order.phone = this.checkoutForm.get('phone').value;
    this.order.address = this.checkoutForm.get('address').value;
    this.order.item = this.items;
    var isDate = new Date()
    var date
    if (isDate.getDate() < 10) {
      date = "0" + isDate.toLocaleDateString();
    }
    else {
      date = isDate.toLocaleDateString();
    }
    this.order.date = this.formatDate(date);
    this.order.total = 0;

    if (this.checkoutForm.get('email').value == null || this.checkoutForm.get('name').value == null || this.checkoutForm.get('phone').value == null || this.checkoutForm.get('address').value == null) {
      alert("Vui lòng điền đẩy đủ thông tin")
    }
    else {
      this.orderService.postOder(this.order)
        .then(res => {
          alert("Đặt hàng thành công");
          sessionStorage.removeItem('items');
          sessionStorage.removeItem('total');
          sessionStorage.removeItem('cart');
          window.location.href = '/orderhistory';
        })
        .catch(err => {
          alert(err);
        })
    }
  }
}
