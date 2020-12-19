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
      this.isLogin = false;
      this.checkoutForm.setValue({name: sessionStorage.getItem('name'), address: '12', phone: '1231', 'email': '1213'})
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

    if (this.order.email == '' || this.order.phone == '' || this.order.address == '' || this.order.address == '') {
      alert("Vui lòng điền đẩy đủ thông tin")
    }
    else {
      this.orderService.postOder(this.order)
        .then(res => {
          alert("Đặt hàng thành công");
          sessionStorage.removeItem('items');
          sessionStorage.removeItem('total');
          window.location.href = '/orderhistory';
        })
        .catch(err => {
          alert(err);
        })
    }
  }
}
