import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking.model';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  isCompletedSalon = false;
  isCompletedService = false;
  isCompletedStylist = false;
  isSelectSalon = false;
  isSelectStylist = false;
  isTest = false;
  isLogin;
  hidden = false;
  bookingcomplete = false;
  isbookingService = false;
  index = -1;
  booking = new Booking();
  bookingDetail = {
    salon: {
      street: '',
      ward: '',
      distrist: '',
      province: '',
    },
    customerId: '',
    servicesPrice: [],
    servicesDuration: [],
    services: [],
    duration: 0,
    price: 0,
    date: '',
    stylistId: '',
    time: '',
  };
  services = [];
  servicesType = [];
  countService = 0;
  constructor(
    private bookingService: BookingService
  ) {
    this.booking.date = this.formatDate(new Date().toLocaleDateString());
  }
  ngAfterViewInit() {
    if (sessionStorage.getItem('isBookingLogin') != null) {
      this.stepper.selectedIndex = 3;
    }
  }
  ngOnInit() {
    if (sessionStorage.getItem('username') != null) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
    // Đặt lịch khi chưa đăng nhập
    if (sessionStorage.getItem('isBookingLogin') != null) {
      this.booking.salonId = JSON.parse(sessionStorage.getItem('salon'));
      this.booking.stylistId = JSON.parse(sessionStorage.getItem('stylist'))
      this.booking.date = sessionStorage.getItem('date2');
      this.booking.time = sessionStorage.getItem('hour');
      this.booking.serviceIds = JSON.parse(sessionStorage.getItem('service'));

      this.bookingDetail.salon.street = sessionStorage.getItem('street');
      this.bookingDetail.salon.ward = sessionStorage.getItem('ward');
      this.bookingDetail.salon.distrist = sessionStorage.getItem('district');
      this.bookingDetail.salon.province = sessionStorage.getItem('province');

      this.bookingDetail.services = JSON.parse(sessionStorage.getItem('serviceDetail'));
      this.bookingDetail.price = JSON.parse(sessionStorage.getItem('servicePrice'));
      this.bookingDetail.duration = JSON.parse(sessionStorage.getItem('serviceDuration'));

      this.bookingDetail.date = sessionStorage.getItem('dateDetail');
      this.bookingDetail.date = sessionStorage.getItem('stylistDetail');
      this.bookingDetail.date = sessionStorage.getItem('hourDetail');
      this.isCompletedSalon = true;
      this.isCompletedService = true;
      this.isCompletedStylist = true;

    }
    sessionStorage.removeItem('isBookingLogin');
  }
  selectSalon(isSelected) {
    this.isCompletedSalon = true;
    this.booking.salonId = isSelected.id;
    // Thông tin chi tiết lịch
    this.bookingDetail.salon.street = isSelected.street;
    this.bookingDetail.salon.ward = isSelected.ward;
    this.bookingDetail.salon.distrist = isSelected.distrist
    this.bookingDetail.salon.province = isSelected.province
    this.isSelectSalon = true;
    sessionStorage.setItem('salon', JSON.stringify(this.booking.salonId));
    sessionStorage.setItem('street', this.bookingDetail.salon.street);
    sessionStorage.setItem('ward', this.bookingDetail.salon.ward);
    sessionStorage.setItem('district', this.bookingDetail.salon.distrist);
    sessionStorage.setItem('province', this.bookingDetail.salon.province);
  }
  deleteService(i){
    this.booking.serviceIds.splice(i, 1);
    this.bookingDetail.services.splice(i, 1);
    this.bookingDetail.price -= this.bookingDetail.servicesPrice[i];
    this.bookingDetail.duration -= this.bookingDetail.servicesDuration[i];
    sessionStorage.setItem('service', JSON.stringify(this.booking.serviceIds));
    sessionStorage.setItem('serviceDetail', JSON.stringify(this.bookingDetail.services));
    sessionStorage.setItem('servicePrice', JSON.stringify(this.bookingDetail.price));
    sessionStorage.setItem('serviceDuration', JSON.stringify(this.bookingDetail.duration));
  }
  selectService(isSelected) {
    // Hủy chọn những dịch vụ đã chọn
    for (let i = 0; i <= this.bookingDetail.services.length; i++) {
      if (this.bookingDetail.services[i] == isSelected) {
        this.bookingDetail.services.splice(i, 1);
        this.booking.serviceIds.splice(i, 1);
        this.services.splice(i, 1);
        this.bookingDetail.servicesPrice.splice(i, 1);
        this.bookingDetail.servicesDuration.splice(i, 1);
        this.servicesType.splice(i, 1);
        this.bookingDetail.price -= isSelected.price;
        this.bookingDetail.duration -= isSelected.duration;
        this.isbookingService = true;
        this.countService -= 1;
        break;
      }
      else {
        // Thay đổi những những dịch vụ trong cùng một loại
        for (let j = 0; j <= i; j++) {
          if (this.servicesType[j] != "Chăm sóc da") {
            if (this.servicesType[j] == isSelected.serviceType && this.services[j] != isSelected.id) {
              this.booking.serviceIds[j] = isSelected.id;
              this.bookingDetail.services[j] = isSelected;
              this.bookingDetail.price += isSelected.price - this.bookingDetail.servicesPrice[j];
              this.bookingDetail.duration += isSelected.duration - this.bookingDetail.servicesDuration[j];
              this.bookingDetail.servicesPrice[j] = isSelected.price;
              this.bookingDetail.servicesDuration[j] = isSelected.duration;
              this.isbookingService = true;
              break;
            }
            else {
              // Dịch vụ đã được chọn
              for (let i = 0; i <= this.services.length; i++) {
                if (this.services[i] == isSelected.id) {
                  this.isbookingService = true;
                  break;
                } else {
                  this.isbookingService = false;
                }
              }
            }
          }
        }
        // this.isbookingService = false;
      }
    }
    // Thêm dịch vụ
    if (this.isbookingService == false) {
      this.servicesType.push(isSelected.serviceType)
      this.services.push(isSelected.id)
      this.booking.serviceIds = this.services
      this.bookingDetail.services.push(isSelected)
      this.bookingDetail.servicesPrice.push(isSelected.price)
      this.bookingDetail.servicesDuration.push(isSelected.duration)
      this.bookingDetail.price += isSelected.price
      this.bookingDetail.duration += isSelected.duration
      this.countService += 1;
      this.index += 1;
    }
    sessionStorage.setItem('service', JSON.stringify(this.booking.serviceIds));
    sessionStorage.setItem('serviceDetail', JSON.stringify(this.bookingDetail.services));
    sessionStorage.setItem('servicePrice', JSON.stringify(this.bookingDetail.price));
    sessionStorage.setItem('serviceDuration', JSON.stringify(this.bookingDetail.duration));

    if (this.booking.serviceIds.length === 0) {
      this.isCompletedService = false;
    } else {
      this.isCompletedService = true;
    }
  }
  selectDate(isSelected) {
    this.booking.date = this.formatDate(isSelected);
    this.bookingDetail.date = isSelected
    this.booking.stylistId = null;
    this.bookingDetail.stylistId = null;
    this.booking.time = null;
    this.bookingDetail.time = null;
    sessionStorage.setItem('date2', this.booking.date)
    sessionStorage.setItem('dateDetail', this.bookingDetail.date)
  }
  selectStylist(isSelected) {
    this.booking.stylistId = isSelected.id;
    this.bookingDetail.stylistId = isSelected.name;
    this.isSelectStylist = true;
    this.booking.time = null;
    this.bookingDetail.time = null;
    sessionStorage.setItem('stylist', JSON.stringify(this.booking.stylistId))
    sessionStorage.setItem('stylistDetail', this.bookingDetail.stylistId)
  }
  selectHour(isSelected) {
    this.booking.time = isSelected
    this.bookingDetail.time = isSelected
    if (this.isSelectStylist) {
      this.isCompletedStylist = true;
    }
    sessionStorage.setItem('hour', this.booking.time)
    sessionStorage.setItem('hourDetail', this.bookingDetail.time)
  }
  formatDate(date) {
    return date.split("/").reverse().join("-");
  }
  bookingS() {
    return this.bookingService.postBooking(this.booking)
      .then(res => {
        this.bookingcomplete = true;
        alert("Đặt lịch thành công");
        sessionStorage.removeItem('salon');
        sessionStorage.removeItem('stylist');
        sessionStorage.removeItem('date2');
        sessionStorage.removeItem('hour');
        sessionStorage.removeItem('service');
        sessionStorage.removeItem('street');
        sessionStorage.removeItem('ward');
        sessionStorage.removeItem('district');
        sessionStorage.removeItem('province');
        sessionStorage.removeItem('isBookingLogin');
        sessionStorage.removeItem('serviceDetail');
        sessionStorage.removeItem('servicePrice');
        sessionStorage.removeItem('serviceDuration');
        sessionStorage.removeItem('dateDetail');
        sessionStorage.removeItem('stylistDetail');
        sessionStorage.removeItem('hourDetail');
        window.location.reload();
      })
      .catch(err => {
        if (err.status) {
          this.bookingcomplete = false;
          alert(err);
        }
      })
  }
  isHidden() {
    this.hidden = !this.hidden
  }
  bookingclick() {
    localStorage.setItem('test', 'test');
    console.log(localStorage.getItem('test'));
  }
  next() {
    // if (!this.isCompletedService) {
    //   alert('Bạn chưa chọn dịch vụ');
    // }
    // if (!this.isCompletedStylist && this.isCompletedService) {
    //   if (!this.isSelectStylist) {
    //     alert('Bạn chưa chọn stylist');
    //   } else {
    //     alert('Bạn chưa chọn giờ');
    //   }
    // }
    if (this.isCompletedStylist) {
      this.isTest = true;
    }
  }
}
