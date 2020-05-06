import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {Article} from '../../models/article';
import {GroupsService} from '../group/groups.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesSubject: Subject<Article>;
  public articles: Article;
  private article: Subscription;
  public success: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private groupsService: GroupsService) {
    this.articlesSubject = new Subject<Article>();
    this.success = '';
    // this.article = this.articlesSubject.asObservable();
    // this.article.subscribe(value => this.articles = value);
  }

  getArticles(id) {
    // console.log('http://localhost:80/projet-fin-formation/api/article/get.php?id=' + id);
    return this.article = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/article/get.php?id=' + id)
      .subscribe(
        (res) => {
          this.articles = res;
          // this.articlesSubject.next(res);
          this.articles.edit = false;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  addArticle(data) {
    return this.article = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/article/post.php', data)
      .subscribe(
        (res) => {
          // console.log(this.groupsService.groups.id);
          if (res === true) {
            this.success = 'Vous venez de publier dans le groupe !';
          }
          this.getArticles(this.groupsService.groups.id);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  updateArticle(data) {
    console.log(data);
    return this.article = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/article/put.php', data)
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
  removeArticle(id) {
    return this.article = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/article/delete.php?id=' + id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

  resetArticlesForm(form) {
    form.reset();
  }
  articleClean() {
    if (this.article) {
      this.article.unsubscribe();
    }
  }
// Créer un service date pour pouvoir générer les dates via cette méthode
  convertTimestamp(timestamp) {
    const timestampJS = timestamp * 1000;
    const e = new Date(timestampJS);
    return e.toLocaleString('fr');
  }
}
