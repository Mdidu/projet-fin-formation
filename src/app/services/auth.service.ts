import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userSubject gérera des données de type User
  private userSubject: Subject<User>;
  public currentUser: User;

  constructor(private httpClient: HttpClient) {
    // propriétés permettant d'accéder à l'utilisateur connecté ?? pas sur
    this.userSubject = new Subject<User>();
  }

  login(data) {
    // const data = JSON.stringify(this.signinForm.value)
    // const pseudo = JSON.stringify(username);
    // const pwd = JSON.stringify(password);

    // Permet d'envoyer des données vers le serveur qui renvoie les infos de l'utilisateur au format json afin de pouvoir "déclarer?"
    // qu'il est connecté dans l'observable userSubject de type User
    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/user/get.php', data)
      .subscribe(
        (res) => {
          // Doit rediriger vers l'accueil du site une fois co
          this.userSubject.next(res);
          this.currentUser = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  logout() {
  }
}
