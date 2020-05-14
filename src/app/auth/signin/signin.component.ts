import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const pseudo = this.signinForm.controls.pseudo.value;
    const password = this.signinForm.controls.password.value;

    this.authService.login(pseudo, password);
  }
  ngOnDestroy() {
    this.authService.error = '';
  }
}
