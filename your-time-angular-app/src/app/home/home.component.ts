import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActivity } from '../interface/activity';
import { ActivityService } from '../services/api/activity.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activities: Partial<IActivity>[];
  add = false;
  edit = false;
  activityForm: FormGroup;
  math = Math;
  errorMessage: string;
  session: any;
  totalMinutes = 0;
  totalLimit = 0;
  remainingLimit: number;
  MAX_LIMIT = 1440;
  selectedDayActivities: IActivity[]; 

  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  toggleActivityInput() {
    this.add = !this.add;
  }

  addMinute(index: number) {
    if (this.activities[index].minutes >= this.activities[index].limit) {
      return;
    }
    this.spinner.show();
    this.activities[index].minutes += 5;
    this.activityService.updateActivity(this.activities[index], this.session.token)
      .toPromise()
      .then(res => {
        this.spinner.hide();
      })
      .catch(err => {
        this.spinner.hide();
        console.log('Error::', err);
      });
  }

  deductMinute(index: number) {
    if (this.activities[index].minutes === 0) {
      return;
    }
    this.spinner.show();
    this.activities[index].minutes -= 5;
    this.activityService.updateActivity(this.activities[index], this.session.token)
      .toPromise()
      .then(res => {
        this.spinner.hide();
      })
      .catch(err => {
        this.spinner.hide();
        console.log('Error::', err);
      });
  }

  removeActivity(index: number) {
    this.spinner.show();
    this.spinner.show();
    this.activityService.deleteActivity(this.activities[index].id, this.session.token)
      .toPromise()
      .then(res => {
        this.spinner.hide();
        this.spinner.hide();
        this.remainingLimit = this.remainingLimit + this.activities[index].limit;
        this.activities.splice(index, 1);
      })
      .catch(err => {
        this.spinner.hide();
        this.spinner.hide();
        console.log('Error::', err);
      })
  }

  saveActivity() {
    if (this.activityForm.controls.limit.value > this.remainingLimit) {
      return;
    }
    this.spinner.show();
    const newActivity: Partial<IActivity> = this.activityForm.value;
    newActivity.minutes = 0;
    newActivity.user_id = this.session.user_id;
    newActivity.time = this.currentTime;
    if (!newActivity.name) {
      this.errorMessage = 'Please enter Activity';
      this.spinner.hide();
      return;
    } else if (!newActivity.limit) {
      this.errorMessage = 'Please enter Limit in Minutes';
      this.spinner.hide();
      return;
    }

    this.activityService.createActivity(newActivity, this.session.token)
      .toPromise()
      .then(res => {
        this.spinner.hide();
        this.activities.push(newActivity);
        this.add = false;
      })
      .catch(err => {
        this.spinner.hide();
        console.log('Error::', err);
      });
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.createForm();
    this.spinner.show();
    this.session = JSON.parse(localStorage.getItem('session'));
    if (this.session && this.session.user_id && this.session.token) {
      this.activityService.getAllActivity(this.session.user_id, this.session.token)
        .toPromise()
        .then((res: Partial<IActivity>[]) => {
          this.spinner.hide();
          this.activities = res;
          this.activities = this.activities.filter(activity => activity.time === this.currentTime);
          if (this.activities.length > 0) {
            this.activities.forEach(element => {
              this.totalMinutes = this.totalMinutes + element.minutes;
              this.totalLimit = this.totalLimit + element.limit;
            });
            this.remainingLimit = this.MAX_LIMIT - this.totalLimit;
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

  get currentTime() {
    const today = new Date();
    today.setHours(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today.setMinutes(0);
    return today.getTime();
  }

  createForm() {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      limit: ['', Validators.required],
    })
  }
}
