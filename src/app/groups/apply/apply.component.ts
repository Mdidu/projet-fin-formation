import { Component, OnInit } from '@angular/core';
import {GroupsComponent} from "../groups.component";
import {GroupsService} from "../../services/group/groups.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  groupId: number;
  constructor(
    private groupsComponent: GroupsComponent,
    public authService: AuthService,
    public groupsService: GroupsService,
    private route: ActivatedRoute) {
    this.groupId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.groupsComponent.apply = true;
    this.listApply();
  }
  listApply() {
    this.groupsService.getApply(this.groupId);
  }
  // TODO: reste l'envoi d'une notification comme quoi l'utilisateur à bien été accepté ou refusé
  onAccept(userId) {
    this.groupsService.acceptApply(this.groupId, userId);
    setTimeout(() => {
      this.listApply();
    }, 1500);
    // console.log(userId);
  }
  onReject(userId) {
    this.groupsService.rejectApply(this.groupId, userId);
    setTimeout(() => {
      this.listApply();
    }, 1500);
    // console.log(userId);
  }

}
