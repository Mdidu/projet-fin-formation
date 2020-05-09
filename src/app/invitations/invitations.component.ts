import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../services/group/groups.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit, OnDestroy {

  userId: number;

  constructor(
    public groupsService: GroupsService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.listInvite();
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
  ngOnDestroy() {
    this.groupsService.groupClean();
  }
}
