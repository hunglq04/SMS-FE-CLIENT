import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient
  ) { }
  getCustomer() {
    return this.httpClient.get<any>(`${environment.baseUrl}/customer/customer`)
      .toPromise();
  }
  putInfo(customer: any) {
    return this.httpClient.put<any>(`${environment.baseUrl}/customer/customer`, customer)
      .toPromise();
  }
}
