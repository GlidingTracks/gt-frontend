import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longitude'
})
export class LongitudePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    /*
    5.23456° (DD: Decimal Degrees)
    5.23456 - 5 = 023456° (you have suntracted your whole number)
    0.23456 x 60' = 14.0736° (14 is your whole minute)
    0.0736 x 60" = 4.416° (this is your seconds)
    DMS (Degree/Minutes/Seconds) is now 5°14'4.416"
    */
    const deg = Math.floor(value);
    const min = Math.floor((value - deg) * 60);
    const sec = Math.floor(((value - deg) * 60 - min) * 600000) / 10000;
    const card = value >= 0 ? 'E' : 'W';

    return `${deg}°${min}'${sec}" ${card}`;
  }
}
