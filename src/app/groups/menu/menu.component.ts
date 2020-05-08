import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GroupsService} from "../../services/group/groups.service";
import {ActivatedRoute} from "@angular/router";
import {GroupsComponent} from "../groups.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  groupId: number;

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService,
    private route: ActivatedRoute,
    public groupsComponent: GroupsComponent
  ) {
    this.groupId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }


}
