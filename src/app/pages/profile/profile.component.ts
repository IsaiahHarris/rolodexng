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
  userProfile: object;

  constructor(
    private session: SessionService,
    private auth: AuthService,
    private backend: BackendService,
    private router: Router
  ) {
    this.user = session.getSession();
    this.loggedIn = this.session.isLoggedIn();
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