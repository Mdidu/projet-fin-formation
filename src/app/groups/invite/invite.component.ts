import { Component, OnInit } from '@angular/core';
import {GroupsComponent} from "../groups.component";
import {AuthService} from "../../services/auth.service";
import {GroupsService} from "../../services/group/groups.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  constructor(
    private groupsComponent: GroupsComponent,
    public authService: AuthService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsComponent.invite = true;
  }

}
