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
    const loginUrl = this.url + 'login';
    return this.http.post(loginUrl, data).toPromise()
  }

  contact(data) {
    const contactUrl = this.url + 'contacts';
    return this.http.post(contactUrl, data).toPromise()
  }

  getContacts() {
    const contactUrl = this.url + 'contacts';
    return this.http.get(contactUrl).toPromise()
  }

  deleteContact(id) {
    const contactUrl = this.url + `contacts/?contact=${id}`
    return this.http.delete(contactUrl).toPromise();
  }

  editContact(data, id) {
    const editUrl = this.url + `contacts/?contact=${id}`
    return this.http.put(editUrl, data).toPromise()
  }

  searchContacts(data) {
    const searchUrl = this.url + `contacts/search/${data}`
    return this.http.get(searchUrl).toPromise();
  }

  getContact(id) {
    const contactUrl = this.url + `contacts/${id}`
    return this.http.get(contactUrl).toPromise()
  }

  register(data) {
    const registerUrl = this.url + 'register';
    return this.http.post(registerUrl, data).toPromise();
  }

  getProfile() {
    const profileUrl = this.url + 'users/profile';
    return this.http.get(profileUrl).toPromise();
  }

  editProfile(data, id) {
    const profileUrl = this.url + `users/profile`;
    return this.http.put(profileUrl, data).toPromise()
  }

  logout() {
    const logoutUrl = this.url + 'logout';
    return this.http.get(logoutUrl).toPromise();
  }
}