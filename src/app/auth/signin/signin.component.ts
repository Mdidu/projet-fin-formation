import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      pseudo: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // const data = JSON.stringify(this.signinForm.value);
    // const data = this.signinForm.value;

    this.authService.login(this.signinForm.controls.pseudo.value, this.signinForm.controls.password.value);
  }
}
