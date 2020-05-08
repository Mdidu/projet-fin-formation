import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import { NavLogComponent } from './header/nav-log/nav-log.component';
import { NavNoLogComponent } from './header/nav-no-log/nav-no-log.component';
import { GroupListUserComponent } from './groups/group-list-user/group-list-user.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupsComponent } from './groups/groups.component';
import { ArticlesComponent } from './articles/articles.component';
import { NewArticleComponent } from './articles/new-article/new-article.component';
import { CommentaryComponent } from './commentary/commentary.component';
import { NewCommentaryComponent } from './commentary/new-commentary/new-commentary.component';

import {AuthService} from './services/auth.service';
import {GroupsService} from './services/group/groups.service';
import {ArticlesService} from './services/article/articles.service';
import {CommentaryService} from './services/commentary.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import { MembersListComponent } from './groups/members-list/members-list.component';
import { MenuComponent } from './groups/menu/menu.component';
import { EventComponent } from './event/event.component';
import { InviteComponent } from './groups/invite/invite.component';
import { ApplyComponent } from './groups/apply/apply.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    NewGroupComponent,
    NavLogComponent,
    NavNoLogComponent,
    GroupListUserComponent,
    GroupListComponent,
    GroupsComponent,
    ArticlesComponent,
    NewArticleComponent,
    CommentaryComponent,
    NewCommentaryComponent,
    MembersListComponent,
    MenuComponent,
    EventComponent,
    InviteComponent,
    ApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    GroupsComponent,
    AuthService,
    GroupsService,
    ArticlesService,
    CommentaryService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
