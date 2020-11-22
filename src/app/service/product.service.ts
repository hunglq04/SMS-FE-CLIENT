import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getProduct() {
    return this.httpClient.get<Array<Product>>(`${environment.baseUrl}/client/product`)
              .toPromise();
  }
}
