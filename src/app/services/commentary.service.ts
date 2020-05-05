import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Commentary} from '../models/commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  private commentarySubject: Subject<Commentary>;
  public commentaries: Commentary;
  public test: boolean;

  constructor(private httpClient: HttpClient) {
    this.commentarySubject = new Subject<Commentary>();
    this.test = false;
  }

  getCommentary(id) {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/commentary/get.php?id=' + id)
      .subscribe(
        (res) => {
          this.commentarySubject = res;
          // this.articles.edit = false;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  updateCommentary(data) {
    console.log(data);

    return this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/commentary/put.php', data)
      .subscribe(
        (res) => {
          // this.articles = res;
          // this.articles.edit = false;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  removeCommentary(id) {
    return this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/commentary/delete.php?id=' + id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  resetCommentaryForm(form) {
    form.reset();
  }

  // Créer un service date pour pouvoir générer les dates via cette méthode
  convertTimestamp(timestamp) {
    const timestampJS = timestamp * 1000;
    const e = new Date(timestampJS);
    return e.toLocaleString('fr');
  }
}
