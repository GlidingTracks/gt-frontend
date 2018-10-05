import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'track'
})
export class TrackPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return null;
  }

}
