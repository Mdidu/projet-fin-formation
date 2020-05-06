import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {GroupsService} from '../../services/group/groups.service';
import {ArticlesService} from '../../services/article/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  articleForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public articlesService: ArticlesService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      content: ['', Validators.required],
      groupId: this.groupsService.groups.id,
      userId: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.articleForm.value;

    this.articlesService.addArticle(data);

    this.articlesService.resetArticlesForm(this.articleForm.controls.content);
  }

  ngOnDestroy() {
    this.articlesService.articleClean();
  }
}
