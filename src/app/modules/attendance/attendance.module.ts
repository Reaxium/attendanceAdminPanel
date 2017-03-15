/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AttendanceComponent} from './component/attendance.component';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";

const attendanceRoutes: Routes = [
  {
    path: 'attendance',
    component: AttendanceComponent,
    children: [{
      path: "dashboard",
      component: DashboardComponent
    }]
  }
];
@NgModule({
  imports: [BrowserModule, DashboardModule, RouterModule.forRoot(attendanceRoutes)],
  declarations: [AttendanceComponent],
  bootstrap: [AttendanceComponent]
})
export class AttendanceModule {

}
