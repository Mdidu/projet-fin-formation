import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Group} from "../../models/group";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupsSubject: Subject<Group>;
  public groups: Group;

  constructor(private httpClient: HttpClient, private authService: AuthService, private route: ActivatedRoute) {
    this.groupsSubject = new Subject<Group>();
  }

  // récupère la liste des groupes auquel l'utilisateur appartient
  getListUserGroups() {
    const data = this.authService.currentUser.id;

    return this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/list-group/get.php', data)
      .subscribe(
        (res) => {
          this.groupsSubject.next(res);
          this.groups = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        });
  }
  // récupère la liste de tous les groupes du site
  getListAllGroups() {
    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/list-group/getAllGroup.php')
      .subscribe(
        (res) => {
          this.groups = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  // récupère les informations du groupe que l'utilisateur visite
  getGroup(id) {
    console.log(id);

    return this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/get.php?id=' + id )
      .subscribe(
        (res) => {
          this.groups = res;
          // console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
}
