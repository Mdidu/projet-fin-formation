import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Commentary} from '../models/commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  private commentarySubject: Subject<Commentary>;
  public commentarys: Commentary;

  constructor(private httpClient: HttpClient) {
    this.commentarySubject = new Subject<Commentary>();
  }

  getCommentary(id) {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/commentary/get.php?id=' + id)
      .subscribe(
        (res) => {
          this.commentarys = res;
          // this.articles.edit = false;
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
}
