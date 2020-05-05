import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-no-log',
  templateUrl: './nav-no-log.component.html',
  styleUrls: ['./nav-no-log.component.css']
})
export class NavNoLogComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
