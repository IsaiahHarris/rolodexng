import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'addcontact', component: AddContactComponent },
        { path: 'contacts', component: ContactsComponent },
        { path: 'contacts/:id', component: SingleComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'profile', component: ProfileComponent },

        { path: '**', redirectTo: '', pathMatch: 'full' }
      ]
    )
  ],
  providers: [
    BackendService,
    SessionService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
