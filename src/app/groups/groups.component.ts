import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../services/group/groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MenuComponent} from "./menu/menu.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {
  articles: boolean;
  members: boolean;
  invite: boolean;
  apply: boolean;
  editName: boolean;
  editDescription: boolean;

  groupId: number;
  userId: number;

  updateNameGroupForm: FormGroup;
  updateDescriptionGroupForm: FormGroup;

  constructor(
    public groupsService: GroupsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.editName = false;
    this.editDescription = false;
  }

  ngOnInit() {
    this.articles = true;
    // récupère l'id du groupe dans l'url et l'injecte dans l'objet groups de type Group du GroupsService
    this.groupsService.groups.id = this.route.snapshot.params.id;

    this.authService.updateCurrentUserRank(this.groupsService.groups.id);

    // appel la méthode getGroup afin d'afficher les informations du groupe que l'utilisateur visite
    this.groupsService.getGroup(this.groupsService.groups.id);

    this.groupId = this.groupsService.groups.id;
    this.userId = this.authService.currentUser.id;
  }
  onUpdateNameGroupForm(content) {
    this.updateNameGroupForm = this.formBuilder.group({
      name: [content, Validators.required]
    });
    this.editName = true;
  }
  onUpdateDescriptionGroupForm(content) {
    this.updateDescriptionGroupForm = this.formBuilder.group({
      description: [content, Validators.required]
    });
    this.editDescription = true;
  }
  onJoin() {

    this.groupsService.joinGroup(this.groupId, this.userId);
    setTimeout(() => {
      this.groupsService.getGroup(this.groupId);
    }, 2000);
  }
  onApply() {

    this.groupsService.applyGroup(this.groupId, this.userId);
  }
  onLeave() {

    this.groupsService.leaveGroup(this.groupId, this.userId);
    setTimeout(() => {
      this.router.navigate(['groups']);
    }, 2000);
  }
  onUpdateNameGroup() {
    const data = this.updateNameGroupForm.controls.name.value;
    this.groupsService.updateNameGroup(this.groupId, data);
    this.editName = false;
    setTimeout(() => {
      this.groupsService.getGroup(this.groupId);
    }, 2000);
  }
  onUpdateDescriptionGroup() {
    const data = this.updateDescriptionGroupForm.controls.description.value;
    this.groupsService.updateDescriptionGroup(this.groupId, data);
    this.editDescription = false;
    setTimeout(() => {
      this.groupsService.getGroup(this.groupId);
    }, 2000);
  }
  ngOnDestroy() {
    this.articles = false;
    this.groupsService.groupClean();
  }
}
