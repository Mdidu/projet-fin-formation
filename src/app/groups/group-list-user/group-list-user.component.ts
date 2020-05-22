import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {GroupsService} from '../../services/group/groups.service';

@Component({
  selector: 'app-group-list-user',
  templateUrl: './group-list-user.component.html',
  styleUrls: ['./group-list-user.component.css']
})
export class GroupListUserComponent implements OnInit, OnDestroy {

  groups: any;

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService) {
    setTimeout(() => {
      this.groups = this.groupsService.groups;
    }, 700);
  }

  ngOnInit() {
    this.groupsService.getListUserGroups();
  }

  ngOnDestroy() {
    this.groupsService.groupClean();
  }

}
