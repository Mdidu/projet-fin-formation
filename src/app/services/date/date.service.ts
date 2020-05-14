import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // convert timestamp in date
  convertTimestamp(timestamp) {
    const timestampJS = timestamp * 1000;
    const e = new Date(timestampJS);
    return e.toLocaleString('fr');
  }
}
