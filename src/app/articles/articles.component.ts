import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../services/article/articles.service";
import {GroupsService} from "../services/group/groups.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {CommentaryService} from "../services/commentary.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  editForm: FormGroup;
  // public test: boolean;
  // public edit: boolean;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private groupsService: GroupsService,
              public articlesService: ArticlesService, public commentaryService: CommentaryService) {/* this.commentaryService.test = false;*/ }

  ngOnInit() {
    this.articlesService.getArticles(this.groupsService.groups.id);
    // this.updateForm();
  }
  onUpdateForm(content, articleId) {
    // console.log(content);
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: articleId
    });
  }
  onEditSubmit(/*e, id*/) {
    // console.log(e);
    // faire en sorte de vraiment le récup depuis le form pour éliminer cette ligne !!
    // this.editForm.value.id = id;

    // console.log(this.editForm.value);
    const data = this.editForm.value;

    this.articlesService.updateArticle(data);
    setTimeout(() => {
      this.articlesService.getArticles(this.groupsService.groups.id);
    }, 1000);
  }

  onRemoveArticle(id) {
    this.articlesService.removeArticle(id);
    setTimeout(() => {
      this.articlesService.getArticles(this.groupsService.groups.id);
    }, 1000);
  }
}
