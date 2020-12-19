import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  history: any;
  id = '';
  name = '';
  date = '';
  address = '';
  products = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  async getOrderHistory() {
    this.orderService.getOrderHistory()
      .then(res => {
        this.history = res
        console.log(res)
      })
      .catch(err => console.log(err));
  }

  showModal(index, orderId) {
    this.name = this.history[index].name;
    this.address = this.history[index].address;
    this.date = this.history[index].date.split(' ')[0];
    this.products = this.history[index].products;
    this.id = orderId;
  }
}
