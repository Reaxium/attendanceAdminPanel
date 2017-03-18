/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {UsersComponent} from "./component/users.component";
import {UsersService} from "./service/users.service";
import {DataTableModule} from "../../../../util/data_table/datatable.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule,DataTableModule],
  declarations: [UsersComponent],
  bootstrap: [UsersComponent],
  providers: [UsersService],
})

export class UsersModule {

}

