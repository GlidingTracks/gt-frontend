import { Pipe, PipeTransform } from '@angular/core';

/*
 * Transform a metric value (number) into a string with value and its unit
 * Usage:
 *  value | meter:'m':precision
 * Parameters:
 *  unit (string): the output unit 'm' or 'km', default is 'm'
 *  precision (float): the desired precision of the output value, default is 1
 * Example:
 *  {{ 1324.456 | meter:'m':1 }}
 *  formats to: '1324m'
 */

@Pipe({
  name: 'meter'
})
export class MeterPipe implements PipeTransform {

  transform(value: number, unit = 'm', precision = 1): string {
    if (this.isInvalidUnit(unit)) {
      throw new Error('Invalid unit');
    }
    let result;
    if (value) {
      if (unit.toLowerCase() === 'km') {
        result = this.roundTo(value / 1000, precision);
      } else {
        result = this.roundTo(value, precision);
      }
    } else {
      result = '0';
    }
    return result + unit;
  }

  isInvalidUnit(unit) {
    return !['m', 'km'].includes(unit);
  }

  roundTo(value, precision) {
    return (Math.round(value / precision) * precision).toString();
  }
}
