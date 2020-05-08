import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Group} from '../../models/group';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupsSubject: Subject<Group>;
  public groups: Group = new Group();
  public members: User = new User();
  private group: Subscription;
  public error: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.groupsSubject = new Subject<Group>();
    this.error = '';
  }

  // récupère la liste des groupes auquel l'utilisateur appartient
  // TODO : A MODIFIER ELLE FONCTIONNE PLUS et transformer le post en get
  getListUserGroups() {
    const data = this.authService.currentUser.id;

    return this.group = this.httpClient
      // .post<any>('http://localhost:80/projet-fin-formation/api/group/list-group/get.php', data)
      .get<any>('http://localhost:80/projet-fin-formation/api/group/list-group/get.php?id=' + data)
      .subscribe(
        (res) => {
          // this.groupsSubject.next(res);
          this.groups = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        });
  }
  // récupère la liste de tous les groupes du site
  getListAllGroups() {
    return this.group = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/list-group/getAllGroup.php')
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
    // console.log(id);

    return this.group = this.httpClient
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
  getMembers(id) {
    return this.group = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/getMembers.php?id=' + id )
      .subscribe(
        (res) => {
          this.members = res;
          console.log(res);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  addGroup(data) {
    return this.group = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/post.php', data)
      .subscribe(
        (res) => {
          if (res === false) {
            this.error = 'Un groupe du même nom existe déjà !';
          } else {
            // console.log(res);
            this.router.navigate(['groups/' + res]);
          }
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  joinGroup(groupId, userId) {
    return this.group = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/joinGroup/post.php', {groupId, userId})
      .subscribe(
        () => {
          this.authService.updateCurrentUserRank(groupId);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  applyGroup(groupId, userId) {
    return this.group = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/applyGroup/post.php', {groupId, userId})
      .subscribe(
        () => {
          // TODO : afficher à l'utilisateur qu'il a bien postulé !

          // this.authService.updateCurrentUserRank(groupId);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  leaveGroup(groupId, userId) {
    // console.log('http://localhost:80/projet-fin-formation/api/group/leaveGroup/delete.php?groupId=' + groupId + '&userId=' + userId);
    return this.group = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/group/leaveGroup/delete.php?groupId=' + groupId + '&userId=' + userId)
      .subscribe(
        (res) => {
          console.log(res);
          this.authService.updateCurrentUserRank(groupId);
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  groupClean() {
    if (this.group) {
      this.group.unsubscribe();
    }
  }
}
