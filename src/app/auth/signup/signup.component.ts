import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      pseudo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkedPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const data = JSON.stringify(this.signupForm.value);

    this.authService.register(data);
  }
  ngOnDestroy() {
    this.authService.error = '';
  }
}
