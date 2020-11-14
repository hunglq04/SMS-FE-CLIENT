import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Salon } from '../model/salon.model'
@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getSalon() {
    return this.httpClient.get<Salon[]>(`${environment.baseUrl}/client/get-all-salon`)
              .toPromise();
  }
}
