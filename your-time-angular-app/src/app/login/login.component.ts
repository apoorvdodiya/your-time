import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidCredentials = false;
  warning = 'CAUTION: This website is created only for learning purpose. It may expose your data.\n\nPlease do not use your personal data as any credential. Dummy data just works fine';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    window.confirm(this.warning);
    this.createLoginForm();
  }

  login() {
    this.spinner.show();
    const userData = this.loginForm.value;
    this.userService.login(userData)
      .toPromise()
      .then((res: any) => {
        this.spinner.hide();
        const session = {
          user_id: res.id,
          token: res.token
        };
        localStorage.setItem('session', JSON.stringify(session));
        this.router.navigate(['./home']);
      })
      .catch(err => {
        this.spinner.hide()
        this.invalidCredentials = true;
        this.createLoginForm();
        console.log("Error::", err);
      })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
