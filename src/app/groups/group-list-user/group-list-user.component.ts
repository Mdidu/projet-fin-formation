import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {GroupsService} from '../../services/group/groups.service';

@Component({
  selector: 'app-group-list-user',
  templateUrl: './group-list-user.component.html',
  styleUrls: ['./group-list-user.component.css']
})
export class GroupListUserComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getListUserGroups();
  }

  ngOnDestroy() {
    this.groupsService.groupClean();
  }

}
