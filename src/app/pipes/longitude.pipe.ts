import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert Decimal Degree (DD) longitude value
 * into the Degree/Minutes/Seconds (DMS)format
 * Usage:
 *  value | longitude
 * Example:
 *  {{ 5.23456 | longitude }}
 *  formats to: `5°14'4.41" E`
 */

@Pipe({
  name: 'longitude'
})
export class LongitudePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const deg = Math.floor(value);
    const min = Math.floor((value - deg) * 60);
    const sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
    const card = value >= 0 ? 'E' : 'W';

    return `${deg}°${min}'${sec}" ${card}`;
  }
}
