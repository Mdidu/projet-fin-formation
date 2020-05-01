import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../services/group/groups.service";
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../services/article/articles.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(public groupsService: GroupsService, public authService: AuthService, public articlesService: ArticlesService, private route: ActivatedRoute) { /*this.groupsService.getGroup();*/}

  ngOnInit() {
    // récupère l'id du groupe dans l'url et l'injecte dans l'objet groups de type Group du GroupsService
    this.groupsService.groups.id = this.route.snapshot.params.id;

    this.authService.updateCurrentUserRank(this.groupsService.groups.id);
    // appel la méthode getGroup afin d'afficher les informations du groupe que l'utilisateur visite
    this.groupsService.getGroup(this.groupsService.groups.id);
    // this.authService.updateCurrentUserRank(this.groupsService.groups.id);
  }

}
