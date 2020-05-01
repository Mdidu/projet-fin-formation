import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {GroupsService} from "../../services/group/groups.service";

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  articleForm: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public authService: AuthService, public groupsService: GroupsService) { }

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
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
}
