import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient) { }

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

  //  Devra envoyer vers le serveur
    return this.httpClient
    .post('http://localhost:80/projet-fin-formation/api/user/post.php', data, {responseType: 'text'})
    .subscribe(
      () => {
        // doit rediriger vers signin
        console.log('yes');
      },
      (error) => {
        console.log('error : ' + error);
      }
    );
  }
}
