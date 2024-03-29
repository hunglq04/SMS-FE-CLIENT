import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  history = [];
  id = '';
  salon = '';
  date = '';
  time = '';
  stylist = '';
  bookingStatus = '';
  image1 = '';
  image2 = '';
  image3 = '';
  image4 = '';
  services = [];

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.getBooKingHistory();
    console.log(this.getBooKingHistory())
  }

  async getBooKingHistory() {
    this.bookingService.getBookingHistory()
      .then(res => {
        this.history = res
        console.log(res[0]['bookingStatus'])
      })
      .catch(err => console.log(err));
  }

  deleteBooking(id) {
    this.bookingService.deleteBooking(id)
      .then(res => console.log(res))
    window.location.href = '/history';
  }
  showModal(index, bookingId) {
    let salonInfo = this.history[index].salon;
    this.salon = [salonInfo.street, salonInfo.district, salonInfo.ward, salonInfo.province].join(", ");
    this.date = this.history[index].dateTime.split(' ')[0];
    this.time = this.history[index].dateTime.split(' ')[1];
    this.stylist = this.history[index].stylist;
    this.services = this.history[index].services;
    this.bookingStatus = this.history[index].bookingStatus;
    this.image1 = this.history[index].image1;
    this.image2 = this.history[index].image2;
    this.image3 = this.history[index].image3;
    this.image4 = this.history[index].image4;
    this.id = bookingId;
  }

}
