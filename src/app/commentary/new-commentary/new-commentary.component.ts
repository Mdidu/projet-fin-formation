import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {GroupsService} from '../../services/group/groups.service';
import {CommentaryService} from '../../services/commentary.service';
import {Commentary} from "../../models/commentary";
import {ArticlesService} from "../../services/article/articles.service";

@Component({
  selector: 'app-new-commentary',
  templateUrl: './new-commentary.component.html',
  styleUrls: ['./new-commentary.component.css']
})
export class NewCommentaryComponent implements OnInit, OnDestroy {

  private comment: Commentary;
  commentaryForm: FormGroup;
  @Input() articleId;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public articlesServices: ArticlesService,
    public groupsService: GroupsService,
    private commentaryService: CommentaryService) { }

  ngOnInit() {
    this.commentaryForm = this.formBuilder.group({
      content: ['', Validators.required],
      articleId: this.articleId,
      userId: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.commentaryForm.value;

    this.commentaryService.addCommentary(data);

    this.commentaryService.resetCommentaryForm(this.commentaryForm.controls.content);

    this.articlesServices.getArticles(this.groupsService.groups.id);
  }
  ngOnDestroy() {
    this.commentaryService.commentaryClean();
    this.articlesServices.articleClean();
  }
}
