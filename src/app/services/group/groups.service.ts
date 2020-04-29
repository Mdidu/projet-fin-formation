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
}
