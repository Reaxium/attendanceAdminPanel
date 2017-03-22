/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {UsersComponent} from "./users.component";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}      from '@angular/http';
import {Ng2PaginationModule} from "ng2-pagination";
import {UsersService} from "./users.service";
import {DataTableComponent} from "../../../../util/data_table/datatable.component";
import {ColumnComponent} from "../../../../util/data_table/column.component";
import {DataTableModule} from "../../../../util/data_table/datatable.module";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, Ng2PaginationModule,DataTableModule],
  declarations: [UsersComponent],
  bootstrap: [UsersComponent],
  providers: [UsersService],
})

export class UsersModule {

}
