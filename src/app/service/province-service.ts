import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProvinceService {

  url = "http://localhost:5000/api/client/province";

  constructor(
    private http: HttpClient
  ) { }
  getAllProvince() {
    return this.http.get(this.url)
      .toPromise()
      .then(res => res);
  }
}
