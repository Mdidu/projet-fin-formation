import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import { PrivateMessageListComponent } from './private-message-list/private-message-list.component';
import { PrivateMessageComponent } from './private-message-list/private-message/private-message.component';
import { NavLogComponent } from './header/nav-log/nav-log.component';
import { NavNoLogComponent } from './header/nav-no-log/nav-no-log.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroupListComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    NewGroupComponent,
    PrivateMessageListComponent,
    PrivateMessageComponent,
    NavLogComponent,
    NavNoLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
