import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  updatePasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      checkedPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    const password = this.updatePasswordForm.controls.password.value;
    const checkedPassword = this.updatePasswordForm.controls.checkedPassword.value;
    const email = this.route.snapshot.params.email;

    if(password === checkedPassword) {
      this.authService.updatePassword(email, password);
    } 
  }
  ngOnDestroy() {
    this.authService.error = '';
  }

}
