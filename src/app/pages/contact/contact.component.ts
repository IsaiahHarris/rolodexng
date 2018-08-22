import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {
  formData: {
    name: string,
    email: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    twitter: string,
    instagram: string,
    github: string
  } = {
      name: '',
      email: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      twitter: '',
      instagram: '',
      github: ''
    }

  nameValid: boolean = false;
  emailValid: boolean = false;
  addressValid: boolean = false;
  mobileValid: boolean = false;
  workValid: boolean = false;
  homeValid: boolean = false;
  twitterValid: boolean = false;
  instagramValid: boolean = false;
  githubValid: boolean = false;

  nameErrors: string[] = [];
  emailErrors: string[] = [];
  addressErrors: string[] = [];
  mobileErrors: string[] = [];
  workErrors: string[] = [];
  homeErrors: string[] = [];
  twitterErrors: string[] = [];
  instagramErrors: string[] = [];
  githubErrors: string[] = [];
  constructor(private backend: BackendService) { }

  validateName() {
    this.nameErrors.length = 0;
    if (!this.formData.name) {
      this.nameErrors.push('Name Is Required')
    } else {
      this.nameValid = true
    }
  }

  getNameErrors() {
    return this.nameErrors.join(', ')
  }

  submitDisabled() {
    return !(this.nameValid)
  }

  submitForm() {
    this.backend.contact(this.formData)
      .then(response => {
        console.log(response)
      })
  }
}