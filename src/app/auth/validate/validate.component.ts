import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  private pseudo: string;
  private token: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.pseudo = this.route.snapshot.params.pseudo;
    this.token = this.route.snapshot.params.token;
    this.authService.validateAuth(this.pseudo, this.token);
  }

  ngOnInit() {
  }

}
