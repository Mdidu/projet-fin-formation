import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: User;

  constructor(public authService: AuthService) {
    // Permet de souscrire à la variable observable 'currentUser' afin de pouvoir masquer ou afficher des éléments du menu
    //  de navigation si le user est co/deco
    // this.authService.currentUser
    //   .subscribe((x) => {
    //     this.currentUser = x;
    //     // console.log(x);
    //     }/*,
    // (error) => {
    //     console.log('error' + error);
    //   }*/);

    // this.authService.user.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}
