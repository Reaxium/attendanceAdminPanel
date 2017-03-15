import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent}  from './component/login.component';
import {AttendanceModule} from "../attendance/attendance.module";
import {Routes, RouterModule} from "@angular/router";
import {AttendanceComponent} from "../attendance/component/attendance.component";
import {DashboardComponent} from "../attendance/modules/dashboard/dashboard.component";
const loginRoutes: Routes = [
];
@NgModule({
  imports: [BrowserModule, AttendanceModule, RouterModule.forRoot(loginRoutes)],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent]
})

export class LoginModule {

}
