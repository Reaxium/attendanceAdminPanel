/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {UsersComponent} from "./users.component";
import {DataTableComponent} from "../../../../util/data_table/datatable.component";
import {ColumnComponent} from "../../../../util/data_table/column.component";
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}      from '@angular/http';
@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [UsersComponent, DataTableComponent, ColumnComponent],
  bootstrap: [UsersComponent]
})

export class UsersModule {

}
