import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentaryService} from '../services/commentary.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Commentary} from '../models/commentary';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit, OnDestroy {

  private comment: Commentary;
  editForm: FormGroup;
  @Input() articleId;

  constructor(
    private formBuilder: FormBuilder,
    public commentaryService: CommentaryService,
    public authService: AuthService) { }

  ngOnInit() {

    this.callGetCommentary(this.articleId);
  }
  callGetCommentary(id) {
    // console.log(id);
    // console.log(this.commentaryService.getCommentary(id));
    this.commentaryService.commentary = this.commentaryService.getCommentary(id)
      .subscribe(value => this.comment = value);
  }
  onUpdateForm(content, commentaryId) {
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: commentaryId
    });
  }
  onEditSubmit() {
    // console.log(this.editForm.value);
    const data = this.editForm.value;

    this.commentaryService.updateCommentary(data);
    setTimeout(() => {
      this.commentaryService.commentary = this.commentaryService.getCommentary(this.articleId)
        .subscribe(value => this.comment = value);
    }, 1000);
  }
  onRemoveCommentary(id) {
    this.commentaryService.removeCommentary(id);
    setTimeout(() => {
      this.commentaryService.commentary = this.commentaryService.getCommentary(this.articleId)
        .subscribe(value => this.comment = value);
    }, 1000);
  }
  ngOnDestroy() {
    this.commentaryService.commentaryClean();
  }
}
