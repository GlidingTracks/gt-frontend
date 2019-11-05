import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  // tslint:disable-next-line:max-line-length
  public sourceMessage = new BehaviorSubject<string>('https://firebasestorage.googleapis.com/v0/b/gt-backend-12f5a.appspot.com/o/4mnVMNoyaCt0weHepKIR4Hj3OHhDTHserSCgfEeliRo?alt=media&token=ad4eba65-0465-4ad3-a920-f35395968536');
  currentMessage = this.sourceMessage.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.sourceMessage.next(message);
  }

}
