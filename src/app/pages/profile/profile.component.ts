import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  userProfile
  isEdit: boolean = false;

  editProfileFormData = {
    name: '',
    email: '',
    address: ''
  }

  constructor(
    private session: SessionService,
    private auth: AuthService,
    private backend: BackendService,
    private router: Router
  ) {
    this.user = session.getSession();
    this.loggedIn = this.session.isLoggedIn();
    this.userProfile = ''
  }

  toggleEdit() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  editProfile(profile) {
    console.log(profile)
    console.log(this.editProfileFormData)
    this.backend.editProfile(this.editProfileFormData, profile.id)
      .then(result => {
        this.ngOnInit()
        this.toggleEdit()
      })
  }
  ngOnInit() {
    if (this.user) {
      this.backend.getProfile()
        .then(result => {
          this.userProfile = result;
        })
    }
  }
}