import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Booking } from '../model/booking.model'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postBooking(booking: Booking) {
    return this.httpClient.post<Booking>(`${environment.baseUrl}/customer/booking`, booking)
      .toPromise();
  }

  getBookingHistory() {
    return this.httpClient.get<any>(`${environment.baseUrl}/customer/booking`)
      .toPromise();
  }

  deleteBooking(id) {
    return this.httpClient.delete<any>(`${environment.baseUrl}/customer/booking/${id}`)
      .toPromise();
  }
}
