import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { StylistService } from '../service/stylist.service';
import { Stylist } from '../model/stylist.model';

@Component({
  selector: 'app-booking-stylist',
  templateUrl: './booking-stylist.component.html',
  styleUrls: ['./booking-stylist.component.css']
})
export class BookingStylistComponent implements OnInit {
  stylists: any;
  stylist: any;
  stylistFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stylistService: StylistService
  ) { }

  getStylist() {
    return this.stylistService.getSylist()
      .then(res => {
        this.stylists = res;
      })
  }
  pickStylist() {
    // this.stylists.forEach(function (item, index, array) {
    //   array[0].stylishSchedule['09:00'] = false;
    //   console.log(array[0].stylishSchedule['09:00'])
    // });
    // this.stylist = this.stylists[0];
    // this.stylist.stylishSchedule['08:00'] = false;
  }
  pickStylist2() {
    console.log("a");
  }
  testClick() {
    // this.stylists.stylishSchedule['08:30'] = false;
    console.log(this.stylists)
    console.log(this.stylists[0].stylishSchedule['08:30'])
    this.stylists[0].stylishSchedule['08:30'] = false;
  }
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
  showtimeNow
  showtimeTomorow
  showtimeTomorow2
  compareTime() {
    var settimeNow;
    var timeNowMiniute;

    var timeNow = new Date(Date.now());
    var timeTomorow = new Date(timeNow);
    var timeTomorow2 = new Date(timeNow);

    timeTomorow.setDate(timeTomorow.getDate() + 1);
    timeTomorow2.setDate(timeTomorow2.getDate() + 2);

    this.showtimeNow = timeNow.toLocaleDateString();
    this.showtimeTomorow = timeTomorow.toLocaleDateString();
    this.showtimeTomorow2 = timeTomorow2.toLocaleDateString();

    if (timeNow.getMinutes() < 10) {
      timeNowMiniute = 0 + timeNow.getMinutes().toString();
      settimeNow = timeNow.getHours().toString() + timeNowMiniute
    }
    else {
      settimeNow = timeNow.getHours().toString() + timeNow.getMinutes().toString()
    }
    console.log('abc', timeTomorow)
    console.log("2", timeTomorow2)

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

  async ngOnInit() {
    this.stylistFormGroup = this.fb.group({
    });
    await this.getStylist();
    this.pickStylist();
    this.compareTime();
  }
}

