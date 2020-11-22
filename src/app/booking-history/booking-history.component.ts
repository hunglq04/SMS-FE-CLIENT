import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  history = [];
  salon = '';
  date = '';
  time = '';
  stylist = '';
  services = [];

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.getBooKingHistory();
  }

  async getBooKingHistory() {
    this.bookingService.getBookingHistory()
      .then(res => this.history = res)
      .catch(err => console.log(err));
  }

  showModal(index) {
    let salonInfo = this.history[index].salon;
    this.salon = [salonInfo.street, salonInfo.district, salonInfo.ward, salonInfo.province].join(", ");
    this.date = this.history[index].dateTime.split(' ')[0];
    this.time = this.history[index].dateTime.split(' ')[1];
    this.stylist = this.history[index].stylist;
    this.services = this.history[index].services;
  }

}
