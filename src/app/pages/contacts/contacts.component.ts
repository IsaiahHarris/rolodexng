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
  ngOnInit() {
    this.backend.getContacts()
      .then(result => {
        console.log('get all', result)
        this.contacts = result
      })
  }
  deleteContact(contact) {
    this.backend.deleteContact(contact.id)
      .then(result => {
        location.reload(true);
      })
  }
}