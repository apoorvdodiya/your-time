import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
