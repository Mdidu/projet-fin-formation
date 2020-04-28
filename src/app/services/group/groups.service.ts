import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Group} from "../../models/group";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupsSubject: Subject<Group>;
  public groups: Group;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.groupsSubject = new Subject<Group>();
  }

  getListGroups() {
    // this.authService.currentUser.id
    // console.log('http://localhost:80/api/list-group/get.php/' + this.authService.currentUser.id + '');
    // TODO: Faire en sorte d'afficher la liste des groupes de l'utilisateur
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
}
