import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GroupsService} from '../../services/group/groups.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-group-list-user',
  templateUrl: './group-list-user.component.html',
  styleUrls: ['./group-list-user.component.css']
})
export class GroupListUserComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getListUserGroups();
  }

  ngOnDestroy() {
    this.groupsService.groupClean();
  }

}
