import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  register(userData: Partial<IUser>) {
    const url = this.BASE_URL + '/user/register';
    return this.http.post(url, userData);
  }

  login(userData: Partial<IUser>) {
    const url = this.BASE_URL + '/user/login';
    return this.http.post(url, userData);
  }

}
