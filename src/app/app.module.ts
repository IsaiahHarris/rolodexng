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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AddContactComponent,
    ContactsComponent
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
        { path: 'contacts', component: ContactsComponent }
      ]
    )
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
