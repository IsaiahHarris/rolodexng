import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerFormData: {
    username: string
  } = {
      username: ''
    }
  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService
  ) { }

  register() {
    this.auth.register(this.registerFormData)
    return this.router.navigate(['login'])
  }

  isLoggedIn() {
    return this.session.isLoggedIn()
  }
}