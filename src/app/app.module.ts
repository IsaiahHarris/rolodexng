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

//shared components
import { HeaderComponent } from './components/header/header.components';

//services
import { BackendService } from './services/backend.service';
import { RegisterComponent } from './pages/register/register.component';
import { SessionService } from './services/session.service';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AddContactComponent,
    ContactsComponent,
    RegisterComponent,
    LogoutComponent
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
        { path: 'register', component: RegisterComponent },
        { path: 'logout', component: LogoutComponent },
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
