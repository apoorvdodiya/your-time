import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.token) {
      return true;
    } else {
      return false;
    }
  }

  addHeaders(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authentication: 'Bearer ' + token
      })
    };
    return httpOptions;
  }

}
