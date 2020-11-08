import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stylist } from '../model/stylist.model'
@Injectable({
  providedIn: 'root'
})
export class StylistService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getSylist() {
    return this.httpClient.get<Array<Stylist>>(`${environment.baseUrl}/client/get-all-stylish`)
              .toPromise();
  }
}
