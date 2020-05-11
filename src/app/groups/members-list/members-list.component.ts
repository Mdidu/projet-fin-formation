import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupsService} from "../../services/group/groups.service";
import {MenuComponent} from "../menu/menu.component";
import {GroupsComponent} from "../groups.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit, OnDestroy {

  // public test: boolean;
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
    this.groupsComponent.members = true;
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
    // this.groupsService.updateUserRank();
  }
  ngOnDestroy() {
    this.groupsComponent.members = false;
    this.groupsService.groupClean();
  }

}
