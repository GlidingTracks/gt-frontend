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

  transform(value: number, type: string): string {
    if (this.isInvalidType(type)) {
      throw new Error('Invalid type');
    }
    const card = this.getCardinalPoint(value, type);
    const absValue = Math.abs(value);
    const deg = Math.floor(absValue);
    const min = Math.floor((absValue - deg) * 60);
    const sec = Math.floor(((absValue - deg) * 60 - min) * 6000) / 100;

    return `${deg}°${min}'${sec}" ${card}`;
  }

  isInvalidType(type) {
    return !['lon', 'lat'].includes(type);
  }

  getCardinalPoint(value, type) {
    if (type === 'lon') {
      return value >= 0 ? 'E' : 'W';
    } else {
      return value >= 0 ? 'N' : 'S';
    }
  }
}
