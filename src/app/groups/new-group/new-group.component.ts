import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import { User } from '../../models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  public error: string;
  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, public authService: AuthService, private router: Router) {
    this.error = '';
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      descriptionGroup: ['', Validators.required],
      security: ['', Validators.required],
      visibility: ['', Validators.required],
      id: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.groupForm.value;

    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/post.php', data)
      .subscribe(
        (res) => {
          if (res === false) {
            this.error = 'Un groupe du même nom existe déjà !';
          } else {
            // console.log(res);
            this.router.navigate(['groups/' + res]);
          }


        },
        (error) => {
          console.log('error' + error);
        }
      );
  }

}
