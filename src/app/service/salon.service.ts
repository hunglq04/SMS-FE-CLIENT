import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Salon } from '../model/salon.model'
import { Province } from '../model/province.model';
import { District } from '../model/district.model';
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
  getProvince() {
    return this.httpClient.get<Array<Province>>(`${environment.baseUrl}/client/provinces`)
              .toPromise();
  }

  getDistrictsAndWards(provinceId) {
    return this.httpClient.get<Array<District>>(`${environment.baseUrl}/client/provinces/${provinceId}/districts`)
              .toPromise();
  }
}
