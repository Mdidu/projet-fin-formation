import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-log',
  templateUrl: './nav-log.component.html',
  styleUrls: ['./nav-log.component.css']
})
export class NavLogComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
