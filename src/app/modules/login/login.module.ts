import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {LoginComponent}  from './component/login.component';
import {AttendanceModule} from "../attendance/attendance.module";
import {LoginUserService} from '../login/services/login.service';
import {Spinner} from '../../util/spinner_loading/spinner.component';
import {InputTextModule,GrowlModule,CheckboxModule}  from 'primeng/primeng';

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    AttendanceModule,
    InputTextModule,
    GrowlModule,
    CheckboxModule],
  declarations: [LoginComponent,Spinner],
  bootstrap: [LoginComponent],
  providers:[LoginUserService]
})
export class LoginModule {

}
