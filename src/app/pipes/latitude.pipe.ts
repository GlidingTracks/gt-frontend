import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert Decimal Degree (DD) latitude value
 * into the Degree/Minutes/Seconds (DMS)format
 * Usage:
 *  value | longitude
 * Example:
 *  {{ 5.23456 | longitude }}
 *  formats to: `5°14'4.41" N`
 */

@Pipe({
  name: 'latitude'
})
export class LatitudePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const deg = Math.floor(value);
    const min = Math.floor((value - deg) * 60);
    const sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
    const card = value >= 0 ? 'N' : 'S';

    return `${deg}°${min}'${sec}" ${card}`;
  }
}
