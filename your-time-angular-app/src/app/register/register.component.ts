import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createRegistrationFrom()
  }

  register() {
    this.spinner.show();
    const userData = this.registrationForm.value;
    this.userService.register(userData)
      .toPromise()
      .then((res: any) => {
        const session = {
          user_id: res.id,
          token: res.token
        };
        localStorage.setItem('session', JSON.stringify(session));
        this.router.navigate(['./profile/create']);
        this.spinner.hide();
      })
      .catch(err => {
        this.spinner.hide();
        console.log('Error:: ', err);
      })

  }

  private createRegistrationFrom() {
    this.registrationForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      termsAndCondition: [false, [Validators.required]]
    });
  }

}
