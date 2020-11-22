import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getBooKingHistory();
  }

  getBooKingHistory() {
    this.bookingService.getBookingHistory()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

}
