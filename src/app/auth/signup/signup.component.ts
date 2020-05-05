import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error: string;
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router) {
    this.error = '';
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      pseudo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkedPassword: ['', [Validators.required]]/*,
      email: ['', [Validators.required]]*/
    });
  }

  onSubmit() {
    const data = JSON.stringify(this.signupForm.value);

    return this.httpClient
    .post('http://localhost:80/projet-fin-formation/api/user/post.php', data)
    .subscribe(
      (res) => {
        if (res === true) {
          this.error = 'Le pseudo existe déjà ! ';
          console.log('Le pseudo existe déjà ! ');
        } else if (res === false) {
          this.error = 'Le mot de passe est erroné !';
          console.log('Le mot de passe est erroné !');
        }

      },
      (error) => {
        console.log('error : ' + error);
      },
      () => {
        if (this.error == '') {
          this.router.navigate(['auth/signin']);
        }
      }
    );
  }
}
