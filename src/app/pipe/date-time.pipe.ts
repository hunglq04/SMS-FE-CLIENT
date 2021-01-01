import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe',
  pure: false
})
export class DateTimePipe implements PipeTransform {
  transform(date: Date) {
    return `${this.addMissingDigit(date.getDate())}/${(this.addMissingDigit(date.getMonth() + 1))}/${this.addMissingDigit(date.getFullYear())}`;
  }

  addMissingDigit(value) {
    return value.toString().length < 2 ? `0${value}` : value;
  }

  addDateToDate(date: Date, date2: number): Date {
    return new Date(new Date(date).setDate(date.getDate() + date2));
  }
}
