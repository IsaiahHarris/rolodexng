import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  user: {
    loggedIn: boolean,
    username: string
  } = {
      loggedIn: false,
      username: ''
    }

  constructor() {

    //check if in local storage
    let userString = window.localStorage.getItem('user');
    try {
      if (userString) {
        this.user = JSON.parse(userString)
      } else {
        console.log('user was not found')
      }
    } catch (err) {
      console.log('could not parse user')
    }
  }

  getSession() {
    return this.user
  }
  // parallel login
  setSession(username) {
    this.user.username = username;
    this.user.loggedIn = true
    //save to local storage
    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString)
  }

  //logging out

  clearSession() {
    this.user.loggedIn = false;
    this.user.username = '';
    window.localStorage.removeItem('user')
  }

  isLoggedIn() {
    return this.user.loggedIn
  }
}