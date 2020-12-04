import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/api/profile.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { IProfile } from '../interface/profile';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Partial<IProfile>;
  edit = false;
  session: any;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.session = JSON.parse(localStorage.getItem('session'));
    if (this.session && this.session.user_id && this.session.token) {
      this.profileService.getProfile(this.session.user_id, this.session.token)
        .toPromise()
        .then((res: Partial<IProfile>) => {
          this.spinner.hide();
          if (_.isEmpty(res)) {
            this.router.navigate(['./profile/create']);
          } else {
            this.profile = res;
          }
        })
        .catch(err => {
          this.spinner.hide();
          console.log('Error::', err);
        })
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

}
