import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SalonService } from '../service/salon.service';
import { Salon } from '../model/salon.model';

@Component({
  selector: 'app-booking-salon',
  templateUrl: './booking-salon.component.html',
  styleUrls: ['./booking-salon.component.css']
})
export class BookingSalonComponent implements OnInit {
  @Output() isSelected = new EventEmitter();
  salonFormGroup: FormGroup;
  salons: Array<Salon>;
  filteredSalon: Observable<Array<Salon>>;
  salon = new Salon();
  constructor(
    private fb: FormBuilder,
    private salonService: SalonService
  ) { }

  async ngOnInit() {
    this.salonFormGroup = this.fb.group({
      salon: ['', Validators.required],
    });
    await this.getSalon();
    localStorage.removeItem("salon");
  }

  displayFn(option: any): string {
    return option ? `${option.street}, ${option.ward}, ${option.district}, ${option.province}` : '' ;
  }

  filterSalons(name: string): Salon[] {
    const filterValue = name.toLowerCase();
    return this.salons.filter(option => option.street.toLowerCase().indexOf(filterValue) === 0);
  }

  getSalon() {
    return this.salonService.getSalon()
      .then(res => {
        this.salons = res;
        this.filteredSalon = this.salonFormGroup.controls['salon'].valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterSalons(name) : this.salons.slice())
          );
      })
  }
  saveSalon() {
    if (this.salonFormGroup.get('salon').value != '') {
      this.salon = this.salonFormGroup.get('salon').value
      sessionStorage.setItem('salon', this.salonFormGroup.get('salon').value.id)
      this.isSelected.emit(this.salon);
    }
  }
}
