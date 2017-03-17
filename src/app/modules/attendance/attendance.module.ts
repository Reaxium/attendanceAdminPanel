/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AttendanceComponent} from './component/attendance.component';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {UsersModule} from "./modules/users/users.module";
import {UsersComponent} from "./modules/users/users.component";
import {DevicesModule} from "./modules/devices/devices.module";
import {DevicesComponent} from "./modules/devices/devices.component";
import {BusinessComponent} from "./modules/business/business.component";
import {BusinessModule} from "./modules/business/business.module";
import {Ng2PaginationModule} from "ng2-pagination";

const attendanceRoutes: Routes = [
  {
    path: 'app',
    redirectTo: '/attendance',
    pathMatch: 'full'
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "devices",
        component: DevicesComponent
      },
      {
        path: "business",
        component: BusinessComponent
      }
    ]
  },

];
@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    UsersModule,
    DevicesModule,
    BusinessModule,
    RouterModule.forRoot(attendanceRoutes),
    Ng2PaginationModule
  ],
  declarations: [AttendanceComponent],
  bootstrap: [AttendanceComponent]
})
export class AttendanceModule {

}
