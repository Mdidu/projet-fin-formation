import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Commentary} from '../../models/commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  private commentarySubject: Subject<Commentary>;
  // public commentaries: Commentary;
  public commentarySubscription: Subscription;
  public success: string;

  constructor(private httpClient: HttpClient) {
    this.commentarySubject = new Subject<Commentary>();
    this.success = '';
  }
// Return Observable<Commentary> car javascript est ASYNC et n'attend pas la méthode pour retourner la valeur qui prend un certains temps
  // puis je souscrit dans la méthode affichComment -> cela permet de ne pas avoir les derniers commentaires pour tous les articles
  getCommentary(id): Observable<Commentary> {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/commentary/get.php?id=' + id) as Observable<Commentary>;
  }
  addCommentary(data) {
    return this.commentarySubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/commentary/post.php', data)
      .subscribe(
        () => {
          this.getCommentary(data.articleId);
          // console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  updateCommentary(data) {
    console.log(data);

    return this.commentarySubscription = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/commentary/put.php', data)
      .subscribe(
        () => {
          // console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }

  removeCommentary(id) {
    return this.commentarySubscription = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/commentary/delete.php?id=' + id)
      .subscribe(
        () => {
          // console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }

  resetCommentaryForm(form) {
    form.reset();
  }

  commentaryClean() {
    if (this.commentarySubscription) {
      this.commentarySubscription.unsubscribe();
    }
  }
}