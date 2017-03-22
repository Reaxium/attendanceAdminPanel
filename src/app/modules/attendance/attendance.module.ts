/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {AttendanceComponent} from './component/attendance.component';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {UsersModule} from "./modules/users/users.module";
import {UsersComponent} from "./modules/users/component/users.component";
import {DevicesModule} from "./modules/devices/devices.module";
import {DevicesComponent} from "./modules/devices/component/devices.component";
import {BusinessComponent} from "./modules/business/business.component";
import {BusinessModule} from "./modules/business/business.module";
import {DataTableModule} from "../../util/data_table/datatable.module";

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
  declarations: [AttendanceComponent],
  imports: [
    DashboardModule,
    UsersModule,
    DevicesModule,
    BusinessModule,
    RouterModule.forRoot(attendanceRoutes),
  ],
  bootstrap: [AttendanceComponent]
})
export class AttendanceModule {

}
