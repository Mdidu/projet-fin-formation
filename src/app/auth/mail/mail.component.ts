import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit, OnDestroy {

  sendMailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              public authService: AuthService) { }

  ngOnInit() {
    this.sendMailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.sendMailForm.controls.email.value;

    this.authService.sendMail(email);
  }
  ngOnDestroy() {
    this.authService.success = '';
    this.authService.error = '';
  }
}
