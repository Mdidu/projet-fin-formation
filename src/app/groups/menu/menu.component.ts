import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {GroupsService} from '../../services/group/groups.service';
import {ActivatedRoute} from '@angular/router';
import {GroupsComponent} from '../groups.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  groupId: number;

  constructor(
    public authService: AuthService,
    public groupsService: GroupsService,
    private route: ActivatedRoute,
    public groupsComponent: GroupsComponent
  ) {
    this.groupId = this.route.snapshot.params.id;

    if (this.authService.currentUser.currentGroupRank === undefined) {
      this.authService.updateCurrentUserRank(this.groupId);
      this.groupsService.focus = false;
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.groupsService.error = '';
    this.groupsService.success = '';
  }

}
