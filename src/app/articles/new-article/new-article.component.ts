import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {GroupsService} from "../../services/group/groups.service";
import {ArticlesService} from "../../services/article/articles.service";

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  public success: string;
  articleForm: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public authService: AuthService,
              public articlesService: ArticlesService, public groupsService: GroupsService) {
    this.success = '';
  }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      content: ['', Validators.required],
      groupId: this.groupsService.groups.id,
      userId: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.articleForm.value;

    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/article/post.php', data)
      .subscribe(
        (res) => {
          // console.log(this.groupsService.groups.id);
          if (res === true) {
            this.success = 'Vous venez de publier dans le groupe !';
          }
          this.articlesService.getArticles(this.groupsService.groups.id);
          this.articlesService.resetArticlesForm(this.articleForm.controls.content);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
}
