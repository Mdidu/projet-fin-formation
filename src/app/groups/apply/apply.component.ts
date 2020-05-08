import { Component, OnInit } from '@angular/core';
import {GroupsComponent} from "../groups.component";
import {GroupsService} from "../../services/group/groups.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  constructor(
    private groupsComponent: GroupsComponent,
    public authService: AuthService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsComponent.apply = true;
  }

}
