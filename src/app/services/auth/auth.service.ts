import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: Subject<User>;
  public currentUser: User;
  private userSubscription: Subscription;
  public error: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    this.userSubject = new Subject<User>();

    this.userSubject.subscribe(value => this.currentUser = value);
    // Allows you to set values currentUser from localStorage values
    // setTimeout(() => {
    this.emitUserSubject(JSON.parse(localStorage.getItem('currentUser')));
    // }, 1000);

    this.error = '';
  }

  register(data) {
    return this.userSubscription = this.httpClient
      .post('https://www.ameddas.ovh/api/user/post.php', data)
      .subscribe(
        (res) => {
          if (res === true) {
            this.error = 'Le pseudo existe déjà ! ';
          } else if (res === false) {
            this.error = 'Les mot de passe ne sont pas identique !';
          }
        },
        (error) => {
          console.log('error : ' + error);
        },
        () => {
          if (this.error === '') {
            this.router.navigate(['auth/signin']);
          }
        }
      );
  }
  login(pseudo, password) {
    return this.userSubscription = this.httpClient
      .put<any>('https://www.ameddas.ovh/api/user/get.php', {pseudo, password})
      .subscribe(
        (res) => {
          // console.log(res);
          if (res === false) {
            this.error = 'Identifiant incorrect !';
          }
          localStorage.setItem('currentUser', JSON.stringify(res));
          // console.log(localStorage);

          this.emitUserSubject(res);
          this.router.navigate(['groups']);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  // update the user's rank for user's rank of current group visiting
  updateCurrentUserRank(groupId) {
    const userId = this.currentUser.id;

    return this.userSubscription = this.httpClient
      .get<any>('https://www.ameddas.ovh/api/group/getCurrentGroupUserRank.php?id=' + userId + '&groupId=' + groupId)
      .subscribe(
        (res) => {
          // console.log(res);
          this.currentUser.currentGroupRank = res;
          // console.log(this.currentUser.currentGroupRank);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.emitUserSubject(null);
    this.authClean();
    this.router.navigate(['']);
  }
  emitUserSubject(value) {
    this.userSubject.next(value);
  }
  // Unsubscribe to user subscription
  authClean() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
