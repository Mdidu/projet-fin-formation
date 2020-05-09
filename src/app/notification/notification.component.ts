import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../services/group/groups.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from "../services/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  userId: number;

  constructor(
    // public groupsService: GroupsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.listNotification();
  }
  listNotification() {
    this.notificationService.getNotification(this.userId);
  }
  ngOnDestroy() {
    this.notificationService.notificationClean();
  }
}
