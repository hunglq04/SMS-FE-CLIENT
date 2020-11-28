import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SalonService } from '../service/salon.service';
import { Salon } from '../model/salon.model';
import { Province } from '../model/province.model';
import { District } from '../model/district.model';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-booking-salon',
  templateUrl: './booking-salon.component.html',
  styleUrls: ['./booking-salon.component.css']
})
export class BookingSalonComponent implements OnInit {
  @Output() isSelected = new EventEmitter();
  salonFormGroup: FormGroup;
  provinceForm: FormGroup;
  salons: Array<Salon>;
  provinces: Array<Province>;
  districts: Array<District>;
  filteredProvinces: Observable<Array<Province>>;
  filteredSalons: Observable<Array<Salon>>;
  filteredDistricts: Observable<Array<District>>;
  salon = new Salon();
  salonID
  selectSalon: any;
  constructor(
    private fb: FormBuilder,
    private salonService: SalonService
  ) { }

  async ngOnInit() {
    this.salonFormGroup = this.fb.group({
    });
    this.provinceForm = this.fb.group({
      province: [''],
      district: [''],
    });
    await this.getSalon();
    await this.getProvince();
  }

  displayFnSalon(option: any): string {
    return option ? `${option.street}, ${option.ward}, ${option.district}, ${option.province}` : '';
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  filterSalons(name: string): Salon[] {
    const filterValue = name.toLowerCase();
    return this.salons.filter(option => option.province.toLowerCase().indexOf(filterValue) === 0);
  }

  filterProvinces(name: string): Province[] {
    const filterValue = name.toLowerCase();
    return this.provinces.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterDistricts(name: string): District[] {
    const filterValue = name.toLowerCase();
    return this.districts.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getSalon() {
    return this.salonService.getSalon()
      .then(res => {
        this.salons = res;
      })
  }
  getProvince() {
    return this.salonService.getProvince()
      .then(res => {
        this.provinces = res;
        this.filteredProvinces = this.provinceForm.controls['province'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterProvinces(name) : this.provinces.slice())
          );
      })
  }
  getDistrictsAndWards(provinceId) {
    console.log(provinceId)
    this.provinceForm.controls['district'].setValue('');
    this.salonService.getDistrictsAndWards(provinceId)
      .then(res => {
        this.districts = res;
        this.filteredDistricts = this.provinceForm.controls['district'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterDistricts(name) : this.districts.slice())
          );
      })
  }

  bookingSalon(isSelected) {
    // if (this.salonFormGroup.get('salon').value != '') {
    //   this.salon = this.salonFormGroup.get('salon').value
    //   sessionStorage.setItem('salon', this.salonFormGroup.get('salon').value.id)
    //   this.isSelected.emit(this.salon);
    // }
    this.salon = isSelected
    this.isSelected.emit(this.salon);
    sessionStorage.setItem('salon', isSelected.id);
    this.salonID = isSelected.id;
    this.selectSalon = isSelected;
  }
  isSelectSalon(isSeclected) {
    return this.selectSalon === isSeclected;
  }
}
