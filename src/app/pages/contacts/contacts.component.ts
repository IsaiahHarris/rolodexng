import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  user: string;
  contacts: any;

  constructor(private backend: BackendService) {
    this.user = 'Isaiah';
    this.contacts = [];
  }
  sortContacts(result) {
    this.contacts = result.sort(function (a, b) {
      console.log(a.name)
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

  deleteContact(contact) {
    this.backend.deleteContact(contact.id)
      .then(result => {
        this.ngOnInit()
      })
  }
}