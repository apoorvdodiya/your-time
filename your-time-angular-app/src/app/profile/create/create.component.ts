import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/api/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  session: any;
  profileForm: FormGroup;
  profilePicture = '../../../assets/png/account-profile-avatar-man-circle-round-user-30452.webp';
  letteredPictures = '../../../assets/png/letters/001-A.png'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createProfileForm();
    this.session = JSON.parse(localStorage.getItem('session'));
  }

  setProfileImage(event) {
    const input: string = this.profileForm.controls.first_name.value
    if (input && input[0]) {
      let id = input[0].toLowerCase();
      let index = (id.charCodeAt(0) - 96).toString();
      let final_id = index;
      for (let i = 0; i < 3 - index.length; i++) {
        final_id = '0' + final_id;
      }
      final_id = final_id + '-' + id;
      this.profilePicture = `../../../assets/png/letters/${final_id}.png`;
    } else {
      this.profilePicture = '../../../assets/png/account-profile-avatar-man-circle-round-user-30452.webp';
    }
  }

  saveProfile() {
    if (!(this.session && this.session.user_id && this.session.token)) {
      return;
    }
    this.spinner.show();
    const profileData = this.profileForm.value;
    profileData.profile_picture = this.profilePicture;
    profileData.user_id = this.session.user_id;
    this.profileService.createProfile(profileData, this.session.token)
      .toPromise()
      .then(res => {
        this.spinner.hide();
        localStorage.setItem('newUser', 'false');
        this.router.navigate(['./home']);
      })
      .catch(err => {
        this.spinner.hide();
        console.log('Error::', err);
      })
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      background: ['#b0c4de']
    })
  }
}
