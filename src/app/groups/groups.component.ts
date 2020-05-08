import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../services/group/groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MenuComponent} from "./menu/menu.component";

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
  // si l'on n'est pas sur la page listant les membres vaut false
  // public members: boolean;
  // public groupId: number;

  constructor(
    // private menu: MenuComponent,
    public groupsService: GroupsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.articles = true;
    // récupère l'id du groupe dans l'url et l'injecte dans l'objet groups de type Group du GroupsService
    this.groupsService.groups.id = this.route.snapshot.params.id;

    this.authService.updateCurrentUserRank(this.groupsService.groups.id);
    // appel la méthode getGroup afin d'afficher les informations du groupe que l'utilisateur visite
    this.groupsService.getGroup(this.groupsService.groups.id);

  }

  onJoin() {
    const groupId = this.groupsService.groups.id;
    const userId = this.authService.currentUser.id;

    this.groupsService.joinGroup(groupId, userId);
    setTimeout(() => {
      this.groupsService.getGroup(groupId);
    }, 2000);
  }
  onApply() {
    const groupId = this.groupsService.groups.id;
    const userId = this.authService.currentUser.id;

    this.groupsService.applyGroup(groupId, userId);

    // setTimeout(() => {
    //   this.groupsService.getGroup(groupId);
    // }, 2000);
  }
  onLeave() {
    const groupId = this.groupsService.groups.id;
    const userId = this.authService.currentUser.id;

    this.groupsService.leaveGroup(groupId, userId);
    setTimeout(() => {
      this.router.navigate(['groups']);
    }, 2000);
  }
  ngOnDestroy() {
    this.groupsService.groupClean();
  }
}
