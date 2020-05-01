import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../services/article/articles.service";
import {GroupsService} from "../services/group/groups.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  editForm: FormGroup;
  public edit: boolean;

  constructor(private formBuilder: FormBuilder, private groupsService: GroupsService, public articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getArticles(this.groupsService.groups.id);
    // this.updateForm();
  }
  updateForm(content, id) {
    // console.log(content);
    this.editForm = this.formBuilder.group({
      content: [content, Validators.required],
      id: [id]
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
}
