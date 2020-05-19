import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentaryService} from '../services/commentary/commentary.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {Commentary} from '../models/commentary';
import {DateService} from '../services/date/date.service';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit, OnDestroy {

  public comment: Commentary;
  editForm: FormGroup;
  @Input() articleId;

  constructor(
    private formBuilder: FormBuilder,
    public commentaryService: CommentaryService,
    public authService: AuthService,
    public dateService: DateService) { }

  ngOnInit() {

    this.callGetCommentary(this.articleId);
  }
  callGetCommentary(id) {
    // console.log(this.commentaryService.getCommentary(id));
    this.commentaryService.commentarySubscription = this.commentaryService.getCommentary(id)
      .subscribe(value => this.comment = value);
  }
  onUpdateForm(content, commentaryId) {
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: commentaryId
    });
  }
  onEditSubmit() {
    const data = this.editForm.value;

    this.commentaryService.updateCommentary(data);
    setTimeout(() => {
      this.commentaryService.commentarySubscription = this.commentaryService.getCommentary(this.articleId)
        .subscribe(value => this.comment = value);
    }, 1000);
  }
  onRemoveCommentary(id) {
    if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.commentaryService.removeCommentary(id);
      setTimeout(() => {
        this.commentaryService.commentarySubscription = this.commentaryService.getCommentary(this.articleId)
          .subscribe(value => this.comment = value);
      }, 1000);
    }
  }
  ngOnDestroy() {
    this.commentaryService.commentaryClean();
  }
}
