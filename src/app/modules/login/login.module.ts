import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {LoginComponent}  from './component/login.component';
import {AttendanceModule} from "../attendance/attendance.module";
import {MaterialModule} from '@angular/material'
import {LoginUserService} from '../login/services/login.service';

@NgModule({
  imports: [BrowserModule,FormsModule,MaterialModule,AttendanceModule],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent],
  providers:[LoginUserService]
})
export class LoginModule {

}
