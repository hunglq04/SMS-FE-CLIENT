import { Component, OnInit, ViewChild, AfterViewInit, Output } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking.model';
import { BookingServiceComponent } from '../booking-service/booking-service.component';
import { MatStepper } from '@angular/material/stepper';
import { Salon } from '../model/salon.model';
import { ActivatedRoute } from '@angular/router';
import { StylistService } from '../service/stylist.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(BookingServiceComponent)
  serviceChild: BookingServiceComponent;
  //Ràng buộc step
  isCompletedSalon = false;
  isCompletedService = false;
  isCompletedStylist = false;
  //Ràng buộc step Stylist
  isSelectStylist = false;
  isSelectDate = false;
  //Kiểm tra dịch vụ đã tồn tại hay chưa
  isbookingService = false;
  isTest = false;
  isLogin;
  hidden = false;
  //Lịch stylist
  stylishSchedule = [];
  checkStylist: boolean;
  reloadChedule = false;
  checkHourServiceStylist: boolean;
  //Thông tin lịch
  booking = new Booking();

  bookingDetail = {
    salon: '',
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
  historyBooking = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private stylistService: StylistService,
    private bookingService: BookingService
  ) {
    this.booking.date = this.formatDate(new Date().toLocaleDateString());
  }
  ngAfterViewInit() {
    if (sessionStorage.getItem('isBookingLogin') != null) {
      this.stepper.selectedIndex = 3;
      sessionStorage.removeItem('isBookingLogin');
    }
    if (sessionStorage.getItem('selectSalonHome') != null) {
      this.booking.salonId = JSON.parse(sessionStorage.getItem('selectSalonHome'))['id']
      let salonInfo = JSON.parse(sessionStorage.getItem('selectSalonHome'));
      console.log(salonInfo)
      this.bookingDetail.salon = [salonInfo.street, salonInfo.ward, salonInfo.district, salonInfo.province].join(", ");
      this.stepper.selectedIndex = 1;
      sessionStorage.removeItem('selectSalonHome')
    }
    //load lại dữ liệu lịch khi đặt trùng giờ
    if (this.reloadChedule == true) {
      //load dữ liệu lịch đặt
      this.booking.salonId = JSON.parse(sessionStorage.getItem('salon'));
      this.booking.stylistId = JSON.parse(sessionStorage.getItem('stylist'))
      this.booking.serviceIds = JSON.parse(sessionStorage.getItem('service'));
      //Load dữ liệu thông tin lịch đặt
      this.bookingDetail.salon = sessionStorage.getItem('salonDetail');
      this.bookingDetail.services = JSON.parse(sessionStorage.getItem('serviceDetail'));
      this.bookingDetail.price = JSON.parse(sessionStorage.getItem('servicePrice'));
      this.bookingDetail.duration = JSON.parse(sessionStorage.getItem('serviceDuration'));
      this.isCompletedSalon = true;
      this.isCompletedService = true;
      this.stepper.selectedIndex = 2;
    }
  }
  ngOnInit() {
    if (sessionStorage.getItem('username') != null) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }

    if (sessionStorage.getItem('isBookingLogin') == null) {
      sessionStorage.removeItem('isSelectServices');
    }
    // Đặt lịch khi chưa đăng nhập
    if (sessionStorage.getItem('isBookingLogin') != null) {
      //load dữ liệu lịch đặt
      this.booking.salonId = JSON.parse(sessionStorage.getItem('salon'));
      this.booking.stylistId = JSON.parse(sessionStorage.getItem('stylist'))
      this.booking.date = sessionStorage.getItem('date2');
      this.booking.time = sessionStorage.getItem('hour');
      this.booking.serviceIds = JSON.parse(sessionStorage.getItem('service'));
      //Load dữ liệu thông tin lịch đặt
      this.bookingDetail.salon = sessionStorage.getItem('salonDetail');
      this.bookingDetail.services = JSON.parse(sessionStorage.getItem('serviceDetail'));
      this.bookingDetail.price = JSON.parse(sessionStorage.getItem('servicePrice'));
      this.bookingDetail.duration = JSON.parse(sessionStorage.getItem('serviceDuration'));

      this.bookingDetail.date = sessionStorage.getItem('dateDetail');
      this.bookingDetail.stylistId = sessionStorage.getItem('stylistDetail');
      this.bookingDetail.time = sessionStorage.getItem('hourDetail');
      this.isCompletedSalon = true;
      this.isCompletedService = true;
      this.isCompletedStylist = true;
    }
    if (sessionStorage.getItem('selectSalonHome') != null) {
      sessionStorage.setItem('salon', JSON.parse(sessionStorage.getItem('selectSalonHome'))['id']);
      this.isCompletedSalon = true;
    }
    // alert(this.reloadChedule);
  }
  //Chọn Salon
  selectSalon(isSelected) {
    this.isCompletedSalon = true;
    this.booking.salonId = isSelected.id;
    // Thông tin chi tiết lịch
    this.bookingDetail.salon = [isSelected.street, isSelected.ward, isSelected.district, isSelected.province].join(", ");
    sessionStorage.setItem('salon', JSON.stringify(this.booking.salonId));
    sessionStorage.setItem('salonDetail', this.bookingDetail.salon);

  }
  //Xóa dịch vụ
  deleteService(i, serviceId) {
    //Xóa dữ liệu Service
    this.bookingDetail.price -= this.bookingDetail.servicesPrice[i];
    this.bookingDetail.duration -= this.bookingDetail.servicesDuration[i];
    this.booking.serviceIds.splice(i, 1);
    this.services.splice(i, 1);
    this.servicesType.splice(i, 1);
    this.bookingDetail.services.splice(i, 1);
    this.bookingDetail.servicesPrice.splice(i, 1);
    this.bookingDetail.servicesDuration.splice(i, 1);
    this.countService -= 1;
    //Set lại button chọn service

    for (let i = 0; i < this.serviceChild.servicesId.length; i++) {
      if (this.serviceChild.servicesId[i] == serviceId) {
        this.serviceChild.indexService.splice(i, 1);
        this.serviceChild.servicesType.splice(i, 1);
        this.serviceChild.servicesId.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i <= this.serviceChild.services.length; i++) {
      if (this.serviceChild.services[i]['id'] == serviceId) {
        this.serviceChild.isSelect[i] = !this.serviceChild.isSelect[i];
        break;
      }
    }
    sessionStorage.setItem('service', JSON.stringify(this.booking.serviceIds));
    sessionStorage.setItem('serviceDetail', JSON.stringify(this.bookingDetail.services));
    sessionStorage.setItem('servicePrice', JSON.stringify(this.bookingDetail.price));
    sessionStorage.setItem('serviceDuration', JSON.stringify(this.bookingDetail.duration));
  }
  //Chọn dịch vụ
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
  //Chọn Ngày
  selectDate(isSelected) {
    this.booking.date = this.formatDate(isSelected);
    this.bookingDetail.date = isSelected
    this.booking.stylistId = null;
    this.bookingDetail.stylistId = null;
    this.booking.time = null;
    this.bookingDetail.time = null;
    this.isSelectDate = true;
    sessionStorage.setItem('date2', this.booking.date)
    sessionStorage.setItem('dateDetail', this.bookingDetail.date)
  }
  //Chọn Stylist
  selectStylist(isSelected) {
    this.booking.stylistId = isSelected.id;
    this.bookingDetail.stylistId = isSelected.name;
    this.isSelectStylist = true;
    this.booking.time = null;
    this.bookingDetail.time = null;
    sessionStorage.setItem('stylist', JSON.stringify(this.booking.stylistId))
    sessionStorage.setItem('stylistDetail', this.bookingDetail.stylistId)
  }
  //Chọn Giờ
  async selectHour(isSelected) {
    this.booking.time = isSelected
    this.bookingDetail.time = isSelected
    sessionStorage.setItem('hour', this.booking.time)
    sessionStorage.setItem('hourDetail', this.bookingDetail.time)
    if (this.isSelectStylist && this.isSelectDate) {
      await this.checkstylishSchedule();
      if (this.checkStylist == false) {
        this.isCompletedStylist = false;
        this.booking.time = null;
        this.bookingDetail.time = null;
        sessionStorage.removeItem('hour');
        sessionStorage.removeItem('hourDetail');
        alert('Đã có người đặt lịch này trước, xin quý khách vui lòng chọn giờ khác')
      }
      else {
        if (this.checkHourServiceStylist == false) {
          alert('Dịch vụ bạn chọn quá thời gian cho phép thực hiện, bạn vui lòng chọn giờ khác hoặc chọn ít dịch vụ hơn')
        }
        this.isCompletedStylist = true;
      }
    }
  }
  formatDate(date) {
    return date.split("/").reverse().join("-");
  }
  async checkstylishSchedule() {
    await this.stylistService.getSylist(sessionStorage.getItem('salon'), sessionStorage.getItem('date2'))
      .then(res => {
        this.stylishSchedule = res;
      })
    var stylistid = sessionStorage.getItem('stylist');
    let index
    for (let i = 0; i < this.stylishSchedule.length; i++) {
      if (this.stylishSchedule[i].id == stylistid) {
        index = i;
      }
    }
    var hour = sessionStorage.getItem('hour');
    this.checkStylist = this.stylishSchedule[index].stylishSchedule[hour];
    let sumService = this.bookingDetail.duration / 30;
    let indexHour
    var stylist = Object.keys(this.stylishSchedule[index].stylishSchedule).sort();
    let length = stylist.length;
    for (let i = 0; i < length; i++) {
      if (stylist[i] == hour) {
        indexHour = i
      }
    }
    this.checkHourServiceStylist = true;
    for (let j = indexHour; j < indexHour + sumService; j++) {
      if (!this.stylishSchedule[index].stylishSchedule[stylist[j]]) {
        this.checkHourServiceStylist = false;
        break;
      }
    }
  }
  //Đặt lịch
  async bookingS() {
    var id
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    })
    if (id != null) {
      this.bookingService.deleteBooking(id)
        .then(res => console.log(res))
    }
    await this.checkstylishSchedule();
    if (this.checkStylist == false) {
      alert('Đã có người đặt lịch này trước, xin quý khách vui lòng chọn giờ khác')
      this.reloadChedule = true;
      await this.reloadChedule;
      window.location.reload();
    }
    else {
      this.bookingService.postBooking(this.booking)
        .then(res => {
          alert("Đặt lịch thành công");
          sessionStorage.removeItem('salon');
          sessionStorage.removeItem('stylist');
          sessionStorage.removeItem('date2');
          sessionStorage.removeItem('hour');
          sessionStorage.removeItem('service');
          sessionStorage.removeItem('salonDetail');
          sessionStorage.removeItem('isSelectServices');
          sessionStorage.removeItem('serviceDetail');
          sessionStorage.removeItem('servicePrice');
          sessionStorage.removeItem('serviceDuration');
          sessionStorage.removeItem('dateDetail');
          sessionStorage.removeItem('stylistDetail');
          sessionStorage.removeItem('hourDetail');
          sessionStorage.removeItem('isBookingLogin');
          window.location.href = '/history';
        })
        .catch(err => {
          alert(err);
        })
    }
  }
  //Ẩn hiện form thông tin
  isHidden() {
    this.hidden = !this.hidden
  }
  bookingclick() {
    localStorage.setItem('test', 'Kiểm tra đăng nhập');
    console.log(localStorage.getItem('test'));
  }
  previous() {
    //Reload dữ liệu khi trở lại bước 1
    if (this.stepper.selectedIndex == 1) {
      this.booking = new Booking();
      this.bookingDetail = {
        salon: '',
        servicesPrice: [],
        servicesDuration: [],
        services: [],
        duration: 0,
        price: 0,
        date: '',
        stylistId: '',
        time: '',
      };
      this.services = [];
      this.servicesType = [];
      this.countService = 0;
      this.isCompletedSalon = false;
      this.isCompletedService = false;
      this.isCompletedStylist = false;
      sessionStorage.removeItem('salon');
      sessionStorage.removeItem('selectSalonHome')
      sessionStorage.removeItem('salonDetail');
      sessionStorage.removeItem('service');
      sessionStorage.removeItem('serviceDetail');
      sessionStorage.removeItem('servicePrice');
      sessionStorage.removeItem('serviceDuration');
      sessionStorage.removeItem('stylist');
      sessionStorage.removeItem('date2');
      sessionStorage.removeItem('hour');
      sessionStorage.removeItem('dateDetail');
      sessionStorage.removeItem('stylistDetail');
      sessionStorage.removeItem('hourDetail');
      sessionStorage.removeItem('isSelectServices');
    }
    //Reload dữ liệu khi trở lại bước 3
    if (this.stepper.selectedIndex == 3) {
      this.isCompletedStylist = false;
      this.isSelectDate = false;
      this.isSelectStylist = false;
      this.bookingDetail.stylistId = '';
      this.bookingDetail.date = '';
      this.bookingDetail.time = '';
      sessionStorage.removeItem('stylist');
      sessionStorage.removeItem('date2');
      sessionStorage.removeItem('hour');
      sessionStorage.removeItem('dateDetail');
      sessionStorage.removeItem('stylistDetail');
      sessionStorage.removeItem('hourDetail');
    }

  }
  next() {
    if (!this.isCompletedService && this.stepper.selectedIndex == 1) {
      alert('Bạn chưa chọn dịch vụ');
    }
    if (!this.isCompletedStylist && this.isCompletedService && this.stepper.selectedIndex == 2) {
      if (!this.isSelectDate) {
        alert('Bạn chưa chọn ngày')
      } else {
        if (!this.isSelectStylist) {
          alert('Bạn chưa chọn stylist');
        } else {
          alert('Bạn chưa chọn giờ');
        }
      }
    }
    if (this.isCompletedStylist) {
      this.isTest = true;
    }
  }
}
