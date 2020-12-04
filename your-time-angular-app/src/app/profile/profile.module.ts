import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, CreateComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
