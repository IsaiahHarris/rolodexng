import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})

export class SingleComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  userProfile
  isEdit: boolean = false;
  contactId
  specContact

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
  constructor(
    private session: SessionService,
    private auth: AuthService,
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  toggleEdit() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  editContact(contact) {
    this.backend.editContact(this.editFormData, contact.id)
      .then(response => {
        this.ngOnInit()
        this.toggleEdit()
      })
  }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    return this.backend.getContact(this.contactId)
      .then(contact => {
        return this.specContact = contact[0];
      })
  }

  deleteContact(contact) {
    this.backend.deleteContact(contact.id)
      .then(result => {
        this.ngOnInit()
      })
  }
}