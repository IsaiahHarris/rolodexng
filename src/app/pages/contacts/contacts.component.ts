import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  user: object;
  userData: object;
  formData: object;
  contacts: any;
  isEdit: boolean = false;
  contactId: string;
  searchTerm



  toggleEdit() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private route: ActivatedRoute
  ) {
    this.user = session.getSession();
    this.contacts = [];
  }
  sortContacts(result) {
    this.contacts = result.sort(function (a, b) {
      var textA = a.name
      var textB = b.name
      return (textA > textB)
    });
  }

  deactivateSearch() {
    if (this.searchTerm.length < 1) {
      return this.backend.getContacts()
        .then(contacts => {
          this.contacts = contacts;
        })
    }
  }





  searchContacts() {
    return this.backend.searchContacts(this.searchTerm)
      .then(result => {
        return this.contacts = result;
      })
  }

  ngOnInit() {
    this.backend.getContacts()
      .then(result => {
        this.sortContacts(result)
        this.userData = Object.assign({}, result);
        this.formData = Object.assign({}, result);
        console.log(this.formData)
      })
  }



  deleteContact(contact) {
    this.backend.deleteContact(contact.id)
      .then(result => {
        this.ngOnInit()
      })
  }
}