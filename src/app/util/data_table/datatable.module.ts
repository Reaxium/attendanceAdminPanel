/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {DataTableComponent} from "./datatable.component";
import {ColumnComponent} from "./column.component";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
  imports: [BrowserModule],

  declarations: [DataTableComponent,ColumnComponent],
  bootstrap: [DataTableComponent]
})
export class DataTableModule {

}
