import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../model/service.model'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getService() {
    return this.httpClient.get<Array<Service>>(`${environment.baseUrl}/client/service/booking`)
              .toPromise();
  }
}
