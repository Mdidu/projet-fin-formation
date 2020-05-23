import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Subject, Subscription} from 'rxjs';
import {Article} from '../../models/article';
import {GroupsService} from '../group/groups.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesSubject: Subject<Article>;
  public articles: Article;
  private articleSubscription: Subscription;
  public success: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private groupsService: GroupsService) {
    this.articlesSubject = new Subject<Article>();
    this.articlesSubject.subscribe(value => this.articles = value);
    this.success = '';
  }

  getArticles(id) {
    return this.articleSubscription = this.httpClient
      .get<any>('https://www.ameddas.ovh/api/article/get.php?id=' + id)
      .subscribe(
        (res) => {
          this.emitArticlesSubject(res);
          this.articles.edit = false;
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  addArticle(data) {
    return this.articleSubscription = this.httpClient
      .post<any>('https://www.ameddas.ovh/api/article/post.php', data)
      .subscribe(
        (res) => {
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
    return this.articleSubscription = this.httpClient
      .put<any>('https://www.ameddas.ovh/api/article/put.php', data)
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  removeArticle(id) {
    return this.articleSubscription = this.httpClient
      .delete<any>('https://www.ameddas.ovh/api/article/delete.php?id=' + id)
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  emitArticlesSubject(value) {
    this.articlesSubject.next(value);
  }
  resetArticlesForm(form) {
    form.reset();
  }
  // Unsubscribe to article subscription
  articleClean() {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
