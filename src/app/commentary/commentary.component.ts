import {Component, Input, OnInit} from '@angular/core';
import {CommentaryService} from "../services/commentary.service";
import {ArticlesService} from "../services/article/articles.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {GroupsService} from "../services/group/groups.service";

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit {

  editForm: FormGroup;
  @Input() articleId;
  // @Input() commentary: any;

  constructor(private formBuilder: FormBuilder, public commentaryService: CommentaryService, public articlesService: ArticlesService,
              public authService: AuthService, private groupsService: GroupsService) { }

  ngOnInit() {
    // this.commentaryService.getCommentary(this.articleId);

    this.affichComment(this.articleId);

    // this.commentaryService.getCommentary(this.articleId);
  }
  affichComment(id) {
    // console.log(id);
    // console.log(this.commentaryService.getCommentary(id));

    // this.articlesService.getArticles(this.groupsService.groups.id);
    this.commentaryService.getCommentary(id);
  }
  onUpdateForm(content, commentaryId) {
    // console.log(content);
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: commentaryId
    });
  }
  onEditSubmit(/*e, id*/) {
    // console.log(e);
    // faire en sorte de vraiment le récup depuis le form pour éliminer cette ligne !!
    // this.editForm.value.id = id;

    // console.log(this.editForm.value);
    const data = this.editForm.value;

    this.commentaryService.updateCommentary(data);
    setTimeout(() => {
      this.commentaryService.getCommentary(this.articleId);
    }, 1000);
  }
  onRemoveCommentary(id) {
    this.commentaryService.removeCommentary(id);
    setTimeout(() => {
      this.commentaryService.getCommentary(this.articleId);
    }, 1000);
  }
}
