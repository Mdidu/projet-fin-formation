import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { GroupListComponent } from './group-list/group-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PrivateMessageListComponent } from './private-message-list/private-message-list.component';
import { PrivateMessageComponent } from './private-message-list/private-message/private-message.component';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import {GroupListUserComponent} from "./groups/group-list-user/group-list-user.component";
import {GroupListComponent} from "./groups/group-list/group-list.component";
import {GroupsComponent} from "./groups/groups.component";


const routes: Routes = [
  { path: 'groups/group-list-user/:id', component: GroupListUserComponent},
  { path: 'groups/group-list', component: GroupListComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'user/profile/:id', component: ProfileComponent},
  { path: 'private-message-list', component: PrivateMessageListComponent},
  { path: 'private-message-list/private-message', component: PrivateMessageComponent},
  { path: 'groups/:id', component: GroupsComponent},
  { path: 'groups/new-group', component: NewGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
