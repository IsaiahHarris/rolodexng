import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//pages
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AddContactComponent } from './pages/addContact/addcontact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

//shared components
import { LogoutComponent } from './pages/logout/logout.component';
import { HeaderComponent } from './components/header/header.components';

//services
import { BackendService } from './services/backend.service';
import { SessionService } from './services/session.service';
import { AuthService } from './services/auth.service';
import { SingleComponent } from './pages/single/single.component';
import { AuthGuard } from './services/guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AddContactComponent,
    ContactsComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', canActivate: [AuthGuard], component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'addcontact', canActivate: [AuthGuard], component: AddContactComponent },
        { path: 'contacts', canActivate: [AuthGuard], component: ContactsComponent },
        { path: 'contacts/:id', canActivate: [AuthGuard], component: SingleComponent, },
        { path: 'register', component: RegisterComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent, },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ]
    )
  ],
  providers: [
    BackendService,
    SessionService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
