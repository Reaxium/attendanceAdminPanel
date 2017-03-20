import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {LoginComponent}  from './component/login.component';
import {AttendanceModule} from "../attendance/attendance.module";
import {MaterialModule} from '@angular/material'
import {LoginUserService} from '../login/services/login.service';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {Spinner} from '../../util/spinner_loading/spinner.component';


@NgModule({
  imports: [BrowserModule,FormsModule,MaterialModule,AttendanceModule,AlertModule.forRoot()],
  declarations: [LoginComponent,Spinner],
  bootstrap: [LoginComponent],
  providers:[LoginUserService]
})
export class LoginModule {

}
