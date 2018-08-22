import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginFormData: {
    username: string
  } = {
      username: ''
    }
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    return this.auth.login(this.loginFormData)
      .then(() => {
        console.log('user logged in')
      })
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}