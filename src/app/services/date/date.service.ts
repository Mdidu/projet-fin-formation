import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // convertie le timestamp en date pour pouvoir l'afficher
  convertTimestamp(timestamp) {
    const timestampJS = timestamp * 1000;
    const e = new Date(timestampJS);
    return e.toLocaleString('fr');
  }
}
