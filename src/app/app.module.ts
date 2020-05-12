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
import { MembersListComponent } from './groups/members-list/members-list.component';
import { MenuComponent } from './groups/menu/menu.component';
import { InviteComponent } from './groups/invite/invite.component';
import { ApplyComponent } from './groups/apply/apply.component';
import { NotificationComponent } from './notification/notification.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { HomeComponent } from './home/home.component';
import { FourohfourComponent } from './fourohfour/fourohfour.component';

import {CommentaryService} from './services/commentary/commentary.service';
import {AuthService} from './services/auth/auth.service';
import {DateService} from './services/date/date.service';
import {GroupsService} from './services/group/groups.service';
import {ArticlesService} from './services/article/articles.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
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
    InviteComponent,
    ApplyComponent,
    NotificationComponent,
    InvitationsComponent,
    HomeComponent,
    FourohfourComponent
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
    AuthGuardService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
