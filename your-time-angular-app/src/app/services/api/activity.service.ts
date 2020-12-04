import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActivity } from 'src/app/interfaces/activity';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  BASE_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllActivity(user_id: number, token: string) {
    const url = this.BASE_URL + '/activity/' + user_id;
    const headers = this.authService.addHeaders(token);
    return this.http.get(url, headers);
  }

  createActivity(activityData: Partial<IActivity>, token: string) {
    const url = this.BASE_URL + '/activity';
    const headers = this.authService.addHeaders(token);
    return this.http.post(url, activityData, headers);
  }

  updateActivity(activityData: Partial<IActivity>, token: string) {
    const url = this.BASE_URL + '/activity/' + activityData.id;
    const headers = this.authService.addHeaders(token);
    return this.http.put(url, activityData, headers);
  }

  deleteActivity(activity_id: number, token) {
    const url = this.BASE_URL + '/activity/' + activity_id;
    const headers = this.authService.addHeaders(token);
    return this.http.delete(url, headers);
  }
}
