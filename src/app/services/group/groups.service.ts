import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Group} from '../../models/group';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupsSubject: Subject<Group>;
  public groups: Group;
  public members: User;
  private groupSubscription: Subscription;
  public error: string;
  public success: string;
  focus: boolean;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.groupsSubject = new Subject<Group>();
    this.groups = new Group();
    this.groupsSubject.subscribe(value => this.groups = value);
    this.members = new User();
    this.error = '';
    this.success = '';
    this.focus = true;
  }

  // retrieve user's groups list for displaying
  getListUserGroups() {
    const data = this.authService.currentUser.id;

    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/list-group/get.php?id=' + data)
      .subscribe(
        (res) => {
          this.emitGroupsSubject(res);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error.message);
        });
  }
  // retrieve all group list for displaying
  getListAllGroups() {
    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/list-group/getAllGroup.php')
      .subscribe(
        (res) => {
          this.emitGroupsSubject(res);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  // retrieve information of visiting group for displaying
  getGroup(id) {
    // console.log(id);

    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/get.php?id=' + id )
      .subscribe(
        (res) => {
          this.emitGroupsSubject(res);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  // retrieve member's list of group for displaying
  getMembers(id) {
    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/getMembers.php?id=' + id )
      .subscribe(
        (res) => {
          this.members = res;
          // console.log(res);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  // retrieve apply list of group for displaying
  getApply(groupId) {
    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/applyGroup/get.php?groupId=' + groupId)
      .subscribe(
        (res) => {
          this.members = res;
          // console.log(res);
        },
        (error) => {
          console.log('error' + error.message);
      }
    );
  }
  addGroup(data) {
    return this.groupSubscription = this.httpClient
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
          console.log('error' + error.message);
        }
      );
  }
  joinGroup(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/joinGroup/post.php', {groupId, userId})
      .subscribe(
        () => {
          this.authService.updateCurrentUserRank(groupId);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  applyGroup(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/applyGroup/post.php', {groupId, userId})
      .subscribe(
        (res) => {
          // console.log(res);
          if (res) {
            this.error = '';
            this.success = 'Vous avez bien postulé pour rejoindre le groupe !';
          } else {
            this.success = '';
            this.error = 'Vous avez déjà postulé ou avez reçu une invitation de la part de se groupe !';
          }
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  leaveGroup(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/group/leaveGroup/delete.php?groupId=' + groupId + '&userId=' + userId)
      .subscribe(
        () => {
          console.log('yes');
          this.authService.updateCurrentUserRank(groupId);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  acceptApply(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/applyGroup/postAccept.php', {groupId, userId})
      .subscribe(() => {
          console.log('yes ');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  rejectApply(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/group/applyGroup/delete.php?groupId=' + groupId + '&userId=' + userId)
      .subscribe(
        () => {
          console.log('yes ');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  sendInvite(pseudo, groupId) {
    return this.groupSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/inviteGroup/post.php', {pseudo, groupId})
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.error = '';
          this.success = 'L\'invitation à bien été envoyé !';
        } else {
          this.success = '';
          this.error = 'L\'invitation n\'a pas pu être envoyé !';
        }
      },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  getInvite(userId) {
    return this.groupSubscription = this.httpClient
      .get<any>('http://localhost:80/projet-fin-formation/api/group/inviteGroup/get.php?userId=' + userId)
      .subscribe(
        (res) => {
          this.emitGroupsSubject(res);
          // console.log(res);
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  acceptInvite(groupId, userId) {
    return this.groupSubscription = this.httpClient
      .post<any>('http://localhost:80/projet-fin-formation/api/group/inviteGroup/postAccept.php', {groupId, userId})
      .subscribe(() => {
          console.log('yes ');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  rejectInvite(groupId, userId) {
    // devra détruire la ligne dans la table apply et ajouter dans la futur table event pour informer l'utilisateur?
    return this.groupSubscription = this.httpClient
      .delete<any>('http://localhost:80/projet-fin-formation/api/group/inviteGroup/delete.php?groupId=' + groupId + '&userId=' + userId)
      .subscribe(
        () => {
          console.log('yes ');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  updateNameGroup(groupId, content) {

    return this.groupSubscription = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/group/updateName.php', {groupId, content})
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  updateDescriptionGroup(groupId, content) {
    console.log(groupId + content);
    return this.groupSubscription = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/group/updateDescription.php', {groupId, content})
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  // Makes the group private or public
  updateGroupSecurity(groupId, security) {
    return this.groupSubscription = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/group/updateSecurity.php', {groupId, security})
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  // Makes the groupe visible or invisible
  updateGroupVisibility(groupId, visibility) {
    return this.groupSubscription = this.httpClient
      .put<any>('http://localhost:80/projet-fin-formation/api/group/updateVisibility.php', {groupId, visibility})
      .subscribe(
        () => {
          console.log('yes');
        },
        (error) => {
          console.log('error' + error.message);
        }
      );
  }
  updateRankUser(rankId, groupId, userId) {
      return this.groupSubscription = this.httpClient
          .put<any>('http://localhost:80/projet-fin-formation/api/group/members/put.php', {rankId, groupId, userId})
          .subscribe(
              (res) => {
                  // console.log(res);
                  if (res) {
                      this.error = '';
                      this.success = 'Vous avez bien changé le rang de l\'utilisateur !';
                  } else {
                      this.success = '';
                      this.error = 'Vous n\'avez pas changé le rang de l\'utilisateur !';
                  }
              },
              (error) => {
                  console.log('error' + error.message);
              }
          );
  }
  emitGroupsSubject(value) {
    this.groupsSubject.next(value);
  }
  // Unsubscribe to group subscription
  groupClean() {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }
}
