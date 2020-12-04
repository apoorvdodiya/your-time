import { Component, OnInit } from '@angular/core';
import { IActivity } from '../interface/activity';
import { ActivityService } from '../services/api/activity.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  math = Math;
  activities: Partial<IActivity>[]
  session: any;
  selectedDateActivities: Partial<IActivity>[];
  selectedDate = this.currentTime;

  constructor(
    private activityService: ActivityService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.session = JSON.parse(localStorage.getItem('session'));
    if (this.session && this.session.user_id && this.session.token) {
      this.activityService.getAllActivity(this.session.user_id, this.session.token)
        .toPromise()
        .then((res: Partial<IActivity>[]) => {
          this.spinner.hide();
          this.activities = res;
          this.selectedDateActivities = this.activities.filter(activity => activity.time === this.currentTime);
        })
        .catch(err => {
          this.spinner.hide();
          console.log("Error::", err);
        })
    }
  }

  nextDate() {
    if (this.selectedDate === this.currentTime) {
      return;
    }
    const nextDate = new Date(this.selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    this.selectedDate = nextDate.getTime();
    this.selectedDateActivities = this.activities.filter(activity => activity.time === nextDate.getTime());
  }

  previousDate() {
    const previousDate = new Date(this.selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    
    this.selectedDate = previousDate.getTime();
    this.selectedDateActivities = this.activities.filter(activity => activity.time === previousDate.getTime());
  }

  get currentTime() {
    const today = new Date();
    today.setHours(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today.setMinutes(0);
    return today.getTime();
  }
}
