import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {GroupsService} from '../../services/group/groups.service';
import {Observable} from "rxjs";
import {Group} from "../../models/group";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {

  // public focus: boolean;
  groups: any;

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService) {
    setTimeout(() => {
      this.groups = this.groupsService.groups;
    }, 700);
  }

  ngOnInit() {
    this.groupsService.focus = true;
    this.groupsService.getListAllGroups();
  }

  ngOnDestroy() {
    this.groupsService.focus = false;
    this.groupsService.groupClean();
  }

}
