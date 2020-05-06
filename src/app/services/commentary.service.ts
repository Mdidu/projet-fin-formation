import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import {Commentary} from '../models/commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  private commentarySubject: Subject<Commentary>;
  public commentaries: Commentary;
  public commentary: Subscription;
  public test: boolean;
  public success: string;

  constructor(private httpClient: HttpClient) {
    this.commentarySubject = new Subject<Commentary>();
    // this.comment = this.commentarySubject.asObservable();
    // this.comment.subscribe(value => this.commentaries = value);
    this.success = '';
    this.test = false;
  }
affichComment(id) {
  this.getCommentary(id)
    .subscribe(value => this.commentaries = value);
}
// Return Observable<Commentary> car javascript est ASYNC et n'attend pas la méthode pour retourner la valeur qui prend un certains temps
  // puis je souscrit dans la méthode affichComment -> cela permet de ne pas avoir les derniers commentaires pour tous les articles
  getCommentary(id): Observable<Commentary> {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/commentary/get.php?id=' + id) as Observable<Commentary>;
  }
  addCommentary(data) {
    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/commentary/post.php', data)
      .subscribe(
        (res) => {
          if (res === true) {
            this.success = 'Vous venez de publier un commentaire !';
          }
          this.getCommentary(data.articleId);
          // console.log(this.groupsService.groups.id);

          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  updateCommentary(data) {
    console.log(data);

    return this.commentary = this.httpClient
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
    return this.commentary = this.httpClient
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

  commentaryClean() {
    if (this.commentary) {
      this.commentary.unsubscribe();
    }
  }

  // Créer un service date pour pouvoir générer les dates via cette méthode
  convertTimestamp(timestamp) {
    const timestampJS = timestamp * 1000;
    const e = new Date(timestampJS);
    return e.toLocaleString('fr');
  }
}
