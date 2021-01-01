import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StylistService } from '../service/stylist.service';
import { Stylist } from '../model/stylist.model';
import { DateTimePipe } from '../pipe/date-time.pipe';
@Component({
  selector: 'app-booking-stylist',
  templateUrl: './booking-stylist.component.html',
  styleUrls: ['./booking-stylist.component.css']
})
export class BookingStylistComponent implements OnInit {
  @Output() isSelectedDate = new EventEmitter();
  @Output() isSelectedStylist = new EventEmitter();
  @Output() isSelectedHour = new EventEmitter();
  stylists: Array<Stylist>;
  showtimeNow
  showtimeTomorow
  showtimeTomorow2
  showtime
  checkPickDate = false;
  slot1 = true;
  slot2 = true;
  slot3 = true;
  slot4 = true;
  slot5 = true;
  slot6 = true;
  slot7 = true;
  slot8 = true;
  slot9 = true;
  slot10 = true;
  slot11 = true;
  slot12 = true;
  slot13 = true;
  slot14 = true;
  slot15 = true;
  slot16 = true;
  slot17 = true;
  slot18 = true;
  slot19 = true;
  slot20 = true;
  slot21 = true;
  slot22 = true;
  slot23 = true;
  slot24 = true;
  salonId = sessionStorage.getItem('salon')
  constructor(
    private stylistService: StylistService,
    private dateTimePipe: DateTimePipe
  ) { }

  getStylist() {
    if (this.checkPickDate == false) {
      var time = this.formatDate(this.showtimeNow)
    }
    else {
      time = this.formatDate(this.showtime)
    }
    return this.stylistService.getSylist(this.salonId, time)
      .then(res => {
        this.stylists = res;
      })
  }
  pickDay(isSelectedDate) {
    this.isSelectedDate.emit(isSelectedDate)
    this.checkPickDate = true;
    this.showtime = isSelectedDate;
    this.getStylist();
  }
  pickStylist(isSelectedStylist) {
    this.isSelectedStylist.emit(isSelectedStylist)
  }
  pickHour(isSelectedHour) {
    this.isSelectedHour.emit(isSelectedHour)
  }
  compareTime() {
    var settimeNow;
    var timeNowMiniute;

    var timeNow = new Date(Date.now());
    var timeTomorow = new Date(timeNow);
    var timeTomorow2 = new Date(timeNow);

    timeTomorow.setDate(timeTomorow.getDate() + 1);
    timeTomorow2.setDate(timeTomorow2.getDate() + 2);

    // Hiển thị ngày

    if (timeNow.getMinutes() < 10) {
      timeNowMiniute = 0 + timeNow.getMinutes().toString();
      settimeNow = timeNow.getHours().toString() + timeNowMiniute
    }
    else {
      settimeNow = timeNow.getHours().toString() + timeNow.getMinutes().toString()
    }

    // Kiểm tra thời gian đặt lịch
    if (settimeNow > 800)
      this.slot1 = false;
    if (settimeNow > 830)
      this.slot2 = false;
    if (settimeNow > 900)
      this.slot3 = false;
    if (settimeNow > 930)
      this.slot4 = false;
    if (settimeNow > 1000)
      this.slot5 = false;
    if (settimeNow > 1030)
      this.slot6 = false;
    if (settimeNow > 1100)
      this.slot7 = false;
    if (settimeNow > 1130)
      this.slot24 = false;
    if (settimeNow > 1300)
      this.slot8 = false;
    if (settimeNow > 1330)
      this.slot9 = false;
    if (settimeNow > 1400)
      this.slot10 = false;
    if (settimeNow > 1430)
      this.slot11 = false;
    if (settimeNow > 1500)
      this.slot12 = false;
    if (settimeNow > 1530)
      this.slot13 = false;
    if (settimeNow > 1600)
      this.slot14 = false;
    if (settimeNow > 1630)
      this.slot15 = false;
    if (settimeNow > 1700)
      this.slot16 = false;
    if (settimeNow > 1730)
      this.slot17 = false;
    if (settimeNow > 1800)
      this.slot18 = false;
    if (settimeNow > 1830)
      this.slot19 = false;
    if (settimeNow > 1900)
      this.slot20 = false;
    if (settimeNow > 1930)
      this.slot21 = false;
    if (settimeNow > 2000)
      this.slot22 = false;
    if (settimeNow > 2030)
      this.slot23 = false;
  }
  formatDate(date) {
    if (!date) return "";
    return date.split("/").reverse().join("-");
  }
  async ngOnInit() {
    this.showtimeNow = this.dateTimePipe.transform(new Date());
    this.showtimeTomorow = this.dateTimePipe.transform(this.dateTimePipe.addDateToDate(new Date(), 1));
    this.showtimeTomorow2 = this.dateTimePipe.transform(this.dateTimePipe.addDateToDate(new Date(), 2));
    this.getStylist();
    if (sessionStorage.getItem('date2') == null) {
      this.isSelectedDate.emit(this.formatDate(this.showtimeNow))
    }
    this.compareTime();
  }
}

