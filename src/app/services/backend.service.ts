import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = 'http://localhost:4200/api/'

  constructor(private http: HttpClient) {

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

  deleteContact() {
    const contactUrl = this.url + 'contacts/:id'
    return this.http.delete(contactUrl).toPromise()
  }
}