import { Component, OnInit } from '@angular/core';
import { IProfile } from './interface/profile';
import { ProfileService } from './services/api/profile.service';
import { AuthService } from './services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profile: Partial<IProfile>;
  session: any;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.session = JSON.parse(localStorage.getItem('session'));
    if (this.authService.loggedIn()) {
      this.profileService.getProfile(this.session.user_id, this.session.token)
        .toPromise()
        .then((res: Partial<IProfile>) => {
          this.spinner.hide();
          this.profile = res;
        })

    }
    this.spinner.hide();
  }
}
