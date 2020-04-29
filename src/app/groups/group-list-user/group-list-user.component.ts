import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {GroupsService} from "../../services/group/groups.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-group-list-user',
  templateUrl: './group-list-user.component.html',
  styleUrls: ['./group-list-user.component.css']
})
export class GroupListUserComponent implements OnInit {

  leaveGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, public authService: AuthService, public groupsService: GroupsService) { }

  ngOnInit() {
    // faire en sorte d'obtenir me groupId qui actuellement vaut vide !!
    this.leaveGroupForm = this.formBuilder.group({
      groupId: '',
      userId: this.authService.currentUser.id
    });
    this.groupsService.getListUserGroups();
  }

  onSubmit() {
  }

}
