import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = 'http://localhost:4200/api/'

  constructor(private http: HttpClient) {

  }

  login(data) {
    console.log('hitting login backend')
    const loginUrl = this.url + 'login';
    console.log('loginUrl', loginUrl)
    return this.http.post(loginUrl, data).toPromise()
  }

  contact(data) {
    console.log(data)
    const contactUrl = this.url + 'contacts';
    return this.http.post(contactUrl, data).toPromise()
  }

  getContacts() {
    console.log('getting contacts')
    const contactUrl = this.url + 'contacts/?users=1';
    return this.http.get(contactUrl).toPromise()
  }

  deleteContact(id) {
    console.log('deleting contact')
    const contactUrl = this.url + `contacts/?contact=${id}`
    return this.http.delete(contactUrl).toPromise();
  }

  register(data) {
    console.log('backend')
    const registerUrl = this.url + 'register';
    return this.http.post(registerUrl, data).toPromise();
  }



  logout() {
    console.log('logout backend service')
    const logoutUrl = this.url + 'logout';
    return this.http.get(logoutUrl).toPromise();
  }
}