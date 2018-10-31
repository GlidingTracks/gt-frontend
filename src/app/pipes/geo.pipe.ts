import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert Decimal Degree (DD) latitude value
 * into the Degree/Minutes/Seconds (DMS)format
 * Usage:
 *  value | geo:'lon'
 * Parameters:
 *  type (string) : 'lont' for longitude values or 'lat' for latitudes values
 * Example:
 *  {{ 5.23456 | geo:'lon' }}
 *  formats to: `5°14'4.41" N`
 */

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {

  transform(value: any, type: string): string {
    if (!value) {
      return 'NaN';
    }
    let card;
    const deg = Math.floor(value);
    const min = Math.floor((value - deg) * 60);
    const sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
    if (value >= 0 && type === 'lon') {
      card = 'E';
    } else if (value >= 0 && type === 'lat') {
      card = 'N';
    } else if (value < 0 && type === 'lon') {
      card = 'W';
    } else if (value < 0 && type === 'lat') {
      card = 'S';
    } else {
      card = '';
    }
    return `${deg}°${min}'${sec}" ${card}`;
  }

}
