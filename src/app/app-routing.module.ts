import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MailComponent } from './auth/mail/mail.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import {ValidateComponent} from './auth/validate/validate.component';
import {GroupListUserComponent} from './groups/group-list-user/group-list-user.component';
import {InvitationsComponent} from './invitations/invitations.component';
import {NotificationComponent} from './notification/notification.component';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import {GroupListComponent} from './groups/group-list/group-list.component';
import {GroupsComponent} from './groups/groups.component';
import {MembersListComponent} from './groups/members-list/members-list.component';
import {ApplyComponent} from './groups/apply/apply.component';
import {InviteComponent} from './groups/invite/invite.component';
import {FourohfourComponent} from './fourohfour/fourohfour.component';

import {AuthGuardService} from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'auth/email', component: MailComponent},
  { path: 'auth/:email/newPassword', component: UpdatePasswordComponent},
  { path: 'auth/:pseudo/:token', component: ValidateComponent},
  { path: 'users/:id/groups', canActivate: [AuthGuardService], component: GroupListUserComponent},
  { path: 'users/:id/invitations', canActivate: [AuthGuardService], component: InvitationsComponent},
  { path: 'users/:id/notifications', canActivate: [AuthGuardService], component: NotificationComponent},
  { path: 'groups', canActivate: [AuthGuardService], component: GroupListComponent},
  { path: 'groups/:id', canActivate: [AuthGuardService], component: GroupsComponent},
  { path: 'groups/:id/members', canActivate: [AuthGuardService], component: MembersListComponent},
  { path: 'groups/:id/invite', canActivate: [AuthGuardService], component: InviteComponent},
  { path: 'groups/:id/apply', canActivate: [AuthGuardService], component: ApplyComponent},
  { path: 'group/new-group', canActivate: [AuthGuardService], component: NewGroupComponent},
  { path: '', component: HomeComponent},
  { path: 'not-found', component: FourohfourComponent},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
