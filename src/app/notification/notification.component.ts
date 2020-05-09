import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/group/groups.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from "../services/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  userId: number;

  constructor(
    public groupsService: GroupsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.listNotification();
    this.listInvite();
  }
  listNotification() {
    this.notificationService.getNotification(this.userId);
  }
  listInvite() {
    this.groupsService.getInvite(this.userId);
  }
  onAccept(groupId) {
    this.groupsService.acceptInvite(groupId, this.userId);
    setTimeout(() => {
      this.listInvite();
    }, 1500);
  }
  onReject(groupId) {
    this.groupsService.rejectInvite(groupId, this.userId);
    setTimeout(() => {
      this.listInvite();
    }, 1500);
  }

}
