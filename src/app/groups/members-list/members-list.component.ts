import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/group/groups.service';
import {GroupsComponent} from '../groups.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit, OnDestroy {

  userRankForm: FormGroup;
  public groupId: number;

  constructor(
    private groupsComponent: GroupsComponent,
    private route: ActivatedRoute,
    public authService: AuthService,
    public groupsService: GroupsService,
    private formBuilder: FormBuilder) {
    this.groupId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.groupsService.getMembers(this.groupId);
  }
  initForm(id) {
    this.userRankForm = this.formBuilder.group({
      rankId: ['', Validators.required],
      userId: id
    });
  }
  onSubmit() {
    const rankId = this.userRankForm.controls.rankId.value;
    const userId = this.userRankForm.controls.userId.value;
    this.groupsService.updateRankUser(rankId, this.groupId, userId);
  }
  ngOnDestroy() {
    this.groupsService.groupClean();
  }
}
