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
    if (value >= 0 && type === 'lon') {
      return 'E';
    } else if (value >= 0 && type === 'lat') {
      return 'N';
    } else if (value < 0 && type === 'lon') {
      return 'W';
    } else if (value < 0 && type === 'lat') {
      return 'S';
    } else {
      throw new Error('No matching cardinal point');
    }
  }
}
