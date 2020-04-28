import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {GroupsService} from "../../services/group/groups.service";
// import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpClient: HttpClient, public authService: AuthService, public groupsService: GroupsService/*,
              private route: ActivatedRoute*/) {
  }

  ngOnInit() {
    this.groupsService.getListGroups();
    // const groups = this.groupsService.groups;

    // console.log(this.groupsService.groups);
    // this.authService.currentUser.id = this.route.snapshot.params.profile;
  }

}
