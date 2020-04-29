import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {GroupsService} from "../../services/group/groups.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(/*private formBuilder: FormBuilder,*/ public authService: AuthService, public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getListAllGroups();
  }

}
