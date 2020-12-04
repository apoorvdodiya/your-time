import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/interface/profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  profile: IProfile;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['./login']);
  }

}
