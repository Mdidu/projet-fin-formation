import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';

import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// userSubject gérera des données de type User
  private userSubject: Subject<User>;
  public currentUser: User;
  private user: Observable<User>;
  private userSubscription: Subscription;
  public error: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    // propriétés permettant d'accéder à l'utilisateur connecté ?? pas sur
    this.userSubject = new Subject<User>();
    this.user = this.userSubject.asObservable();

    // Permet de changer la valeur de currentUser via l'observable user lordque l'utilisateur se connecte ou déconnecte
    this.user.subscribe(value => this.currentUser = value);
    this.error = '';
  }

  register(data) {
    return this.userSubscription = this.httpClient
      .post('http://localhost:80/projet-fin-formation/api/user/post.php', data)
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

    // Permet d'envoyer des données vers le serveur qui renvoie les infos de l'utilisateur au format json afin de pouvoir "déclarer?"
    // qu'il est connecté dans l'observable userSubject de type User
    return this.userSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/user/get.php', {pseudo, password})
      .subscribe(
        (res) => {
          if (res === false) {
            this.error = 'Identifiant incorrect !';
          }
          // Doit rediriger vers l'accueil du site une fois co
          // this.userSubject.next(res);
          // this.currentUser = res;
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.userSubject.next(res);
          this.router.navigate(['groups']);

          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  updateCurrentUserRank(groupId) {
    const userId = this.currentUser.id;

    return this.userSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/getCurrentGroupUserRank.php?id=' + userId + '&groupId=' + groupId)
      .subscribe(
        (res) => {
          this.currentUser.currentGroupRank = res;
          // console.log(this.currentUser.currentGroupRank);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  logout() {
    return this.userSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/user/getLogout.php?pseudo=' + this.currentUser.username)
      .subscribe(
        () => {
          localStorage.removeItem('currentUser');
          this.userSubject.next(null);
          // console.log(res);
          this.authClean();
          this.router.navigate(['']);
        }
      );
  }
  authClean() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}