import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private backend: BackendService,
    private session: SessionService
  ) { }

  register(data) {
    console.log('auth')
    return this.backend.register(data)
  }

  login(data) {
    console.log('hitting login auth')
    return this.backend.login(data)
      .then(response => {
        console.log('response on auth')
        return this.session.setSession(response['username']);
      });
  }

  logout() {
    console.log('logoutauth')
    return this.backend.logout()
      .then(repsonse => {
        return this.session.clearSession();
      })
  }
}