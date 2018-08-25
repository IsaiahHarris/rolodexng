import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  user: string;
  contacts: any;
  isEdit: boolean = false;
  editFormData: {
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

  toggleEdit() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;

    }
  }

  constructor(private backend: BackendService) {
    this.user = 'Isaiah';
    this.contacts = [];
  }
  sortContacts(result) {
    this.contacts = result.sort(function (a, b) {
      var textA = a.name
      var textB = b.name
      return (textA > textB)
    });
  }

  ngOnInit() {
    this.backend.getContacts()
      .then(result => {
        this.sortContacts(result)
      })
  }

  editContact(contact) {
    this.backend.editContact(this.editFormData, contact.id)
      .then(response => {
        this.ngOnInit()
        this.toggleEdit()
      })
  }

  deleteContact(contact) {
    this.backend.deleteContact(contact.id)
      .then(result => {
        this.ngOnInit()
      })
  }
}