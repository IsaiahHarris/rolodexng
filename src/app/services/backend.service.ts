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
}