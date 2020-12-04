import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  BASE_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProfile(user_id: number, token: string) {
    const url = this.BASE_URL + '/profile/' + user_id;
    const headers = this.authService.addHeaders(token);
    return this.http.get(url, headers);
  }

  createProfile(profileData, token: string) {
    const url = this.BASE_URL + '/profile'
    const headers = this.authService.addHeaders(token);
    return this.http.post(url, profileData, headers);
  }
}
