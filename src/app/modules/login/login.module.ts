import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent}  from './component/login.component';
import {AttendanceModule} from "../attendance/attendance.module";
@NgModule({
  imports: [BrowserModule, AttendanceModule],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent]
})
export class LoginModule {

}
