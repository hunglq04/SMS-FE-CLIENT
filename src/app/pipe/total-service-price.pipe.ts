import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalServicePrice',
  pure: false
})
export class TotalServicePricePipe implements PipeTransform {
  transform(services: any[]) {
    return services.map(s => s.price).reduce((a, b) => a + b);
  }
}