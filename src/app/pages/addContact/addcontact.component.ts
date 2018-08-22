import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
@Component({
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})

export class AddContactComponent {
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

  validateEmail() {
    this.emailErrors.length = 0;
    if (!this.formData.email.includes('@')) {
      this.emailErrors.push('Email may not be valid')
    }
  }

  getNameErrors() {
    return this.nameErrors.join(', ')
  }

  getEmailErrors() {
    return this.emailErrors.join(', ')
  }
  submitDisabled() {
    return !(this.nameValid)
  }

  submitForm() {
    this.backend.contact(this.formData)
      .then(response => {
        this.formData.name = '';
        this.formData.address = '';
        this.formData.github = '';
        this.formData.mobile = '';
        this.formData.home = '';
        this.formData.work = '';
        this.formData.instagram = '';
        this.formData.twitter = '';
        this.formData.email = '';
        console.log(response)
      })
  }
}