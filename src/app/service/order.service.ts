import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../model/oder.model'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postOder(order: Order) {
    return this.httpClient.post<Order>(`${environment.baseUrl}/customer/order`, order)
      .toPromise();
  }
  getOrderHistory(){
    return this.httpClient.get<Order>(`${environment.baseUrl}/customer/order`)
    .toPromise();
  }

}
