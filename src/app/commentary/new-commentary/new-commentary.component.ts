import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ArticlesService} from "../../services/article/articles.service";
import {GroupsService} from "../../services/group/groups.service";
import {CommentaryService} from "../../services/commentary.service";

@Component({
  selector: 'app-new-commentary',
  templateUrl: './new-commentary.component.html',
  styleUrls: ['./new-commentary.component.css']
})
export class NewCommentaryComponent implements OnInit {

  commentaryForm: FormGroup;
  @Input() articleId;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public authService: AuthService,
              public articlesService: ArticlesService, public groupsService: GroupsService, private commentaryService: CommentaryService) { }

  ngOnInit() {
    this.commentaryForm = this.formBuilder.group({
      content: ['', Validators.required],
      // groupId: this.groupsService.groups.id,
      articleId: this.articleId,
      userId: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.commentaryForm.value;

    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/commentary/post.php', data)
      .subscribe(
        (/*res*/) => {
          // console.log(this.groupsService.groups.id);
          // this.articlesService.getArticles(this.groupsService.groups.id);
          this.commentaryService.resetCommentaryForm(this.commentaryForm.controls.content);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
}
