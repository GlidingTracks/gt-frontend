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
    let deg, min, sec, card;
    if (value) {
      deg = Math.floor(value);
      min = Math.floor((value - deg) * 60);
      sec = Math.floor(((value - deg) * 60 - min) * 6000) / 100;
      switch (type) {
        case 'lon':
          card = value >= 0 ? 'E' : 'W';
          break;
        case 'lat':
          card = value >= 0 ? 'N' : 'S';
          break;
      }
    } else {
      deg = 0;
      min = 0;
      sec = 0;
      card = '';
    }
    return `${deg}°${min}'${sec}" ${card}`;
  }

}
