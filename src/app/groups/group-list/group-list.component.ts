import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GroupsService} from '../../services/group/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getListAllGroups();
  }

  ngOnDestroy() {
    this.groupsService.groupClean();
  }

}
