import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  register() {
    this.auth.register(this.registerFormData)

    console.log('trying to navigate')
    return this.router.navigate(['login'])


  }
}