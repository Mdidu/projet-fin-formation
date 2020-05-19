import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from '../services/article/articles.service';
import {GroupsService} from '../services/group/groups.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {CommentaryService} from '../services/commentary/commentary.service';
import {DateService} from '../services/date/date.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private groupsService: GroupsService,
    public articlesService: ArticlesService,
    public commentaryService: CommentaryService,
    public dateService: DateService) {
    this.commentaryService.success = '';
  }

  ngOnInit() {
    this.articlesService.getArticles(this.groupsService.groups.id);
  }
  onUpdateForm(content, articleId) {
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: articleId
    });
  }
  onEditSubmit() {
    // console.log(this.editForm.value);
    const data = this.editForm.value;

    this.articlesService.updateArticle(data);
    setTimeout(() => {
      this.articlesService.getArticles(this.groupsService.groups.id);
    }, 1000);
  }

  onRemoveArticle(id) {
    if (confirm('Voulez-vous vraiment supprimer cette article ?')) {
      this.articlesService.removeArticle(id);
      setTimeout(() => {
        this.articlesService.getArticles(this.groupsService.groups.id);
      }, 1000);
    }
  }
  ngOnDestroy() {
    this.commentaryService.success = '';
    this.articlesService.articleClean();
  }
}
