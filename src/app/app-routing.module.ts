import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AttendenceDashboardComponent } from './Components/attendence-dashboard/attendence-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/HomePage', pathMatch: 'full' },
  {path:'HomePage', component:HomePageComponent},{ path: 'Dashboard', component: DashboardComponent }, { path: 'log-in', component: LogInComponent },
{ path: 'sign-up', component: SignUpComponent },{path:'AttendenceDashboard',component:AttendenceDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
