import { Component, OnInit, } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit {
  isCompletedSalon = false;
  isCompletedService = false;
  isCompletedStylist = false;
  isLogin;
  hidden = false;
  booking = new Booking();
  bookingDetail = {
    salon:{
      street: '',
      ward: '',
      distrist: '',
      province: '',
    },
    customerId: '',
    serviceIds: [],
    date: '',
    stylistId: '',
    time: '',
  };
  services = [];
  constructor(
    private bookingService: BookingService
  ) {
    this.booking.date = this.formatDate(new Date().toLocaleDateString());
  }
  ngOnInit() {
    if (sessionStorage.getItem('username') != null) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }
  selectSalon(isSelected) {
    this.isCompletedSalon = true;
    this.booking.salonId = isSelected.id;
    this.bookingDetail.salon.street = isSelected.street;
    this.bookingDetail.salon.ward = isSelected.ward;
    this.bookingDetail.salon.distrist = isSelected.distrist
    this.bookingDetail.salon.province = isSelected.province
  }
  selectService(isSelected) {
    this.isCompletedService = true;
    this.services.push(isSelected);
    this.booking.serviceIds = this.services;
    this.bookingDetail.serviceIds = this.services;
  }
  selectDate(isSelected) {
    this.booking.date = this.formatDate(isSelected);
    this.bookingDetail.date = isSelected
  }
  selectStylist(isSelected) {
    this.booking.stylistId = 6;
    this.booking.customerId = 1;
    this.bookingDetail.stylistId = isSelected.name
  }
  selectHour(isSelected) {
    this.isCompletedStylist = true;
    this.booking.time = isSelected
    console.log(this.booking)
    this.bookingDetail.time = isSelected
    console.log(this.bookingDetail)
  }
  formatDate(date) {
    return date.split("/").reverse().join("-");
  }
  bookingS() {
    return this.bookingService.postBooking(this.booking)
      .then(res => {
       console.log(res);
      })
  }
  isHidden(){
    this.hidden = !this.hidden
  }
  bookingclick() {
    localStorage.setItem('test', 'test');
    console.log(localStorage.getItem('test'));
  }

}
