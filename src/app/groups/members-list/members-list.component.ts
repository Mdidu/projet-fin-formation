import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from "../../services/group/groups.service";
import {MenuComponent} from "../menu/menu.component";
import {GroupsComponent} from "../groups.component";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  public test: boolean;
  public groupId: number;

  constructor(
    private groupsComponent: GroupsComponent,
    private route: ActivatedRoute,
    public groupsService: GroupsService) {
    this.groupId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.groupsComponent.members = true;
    this.groupsService.getMembers(this.groupId);
  }

}
