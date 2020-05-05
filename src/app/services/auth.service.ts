import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { User } from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userSubject gérera des données de type User
  private userSubject: Subject<User>;
  public currentUser: User;
  private user: Observable<User>;

  constructor(private httpClient: HttpClient, private router: Router) {
    // propriétés permettant d'accéder à l'utilisateur connecté ?? pas sur
    this.userSubject = new Subject<User>();
    this.user = this.userSubject.asObservable();

    // Permet de changer la valeur de currentUser via l'observable user lordque l'utilisateur se connecte ou déconnecte
    this.user.subscribe(value => this.currentUser = value);
  }

  login(/*data*/pseudo, password) {

    // Permet d'envoyer des données vers le serveur qui renvoie les infos de l'utilisateur au format json afin de pouvoir "déclarer?"
    // qu'il est connecté dans l'observable userSubject de type User
    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/user/get.php', {pseudo, password})
      .subscribe(
        (res) => {
          // Doit rediriger vers l'accueil du site une fois co
          // this.userSubject.next(res);
          // this.currentUser = res;
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.userSubject.next(res);

          // console.log(res);
          // console.log(this.currentUser);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  updateCurrentUserRank(groupId) {
    const userId = this.currentUser.id;

    // modifier l'url
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/getCurrentGroupUserRank.php?id=' + userId + '&groupId=' + groupId)/*
      .get<any>('http://localhost:80/projet-fin-formation/api/group/getCurrentGroupUserRank.php?groupId=' + groupId)*/
      .subscribe(
        (res) => {
          // Doit rediriger vers l'accueil du site une fois co
          this.currentUser.currentGroupRank = res;
          console.log(this.currentUser.currentGroupRank);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  logout() {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/user/getLogout.php?pseudo=' + this.currentUser.username)
      .subscribe(
        (res) => {
          // this.currentUser = '';
          localStorage.removeItem('currentUser');
          this.userSubject.next(null);
          // console.log(res);
          this.router.navigate(['auth/signin']);
        }
      );
  }
}
