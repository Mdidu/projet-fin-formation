import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubscription: Subscription;

  constructor(
    private httpClient: HttpClient
  ) { }

  getNotification(userId) {
    return this.notificationSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/notification/get.php?userId=' + userId)
      .subscribe(
        (res) => {
          // this.members = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  notificationClean() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
