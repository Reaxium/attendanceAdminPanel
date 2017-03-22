/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2PaginationModule} from "ng2-pagination";
import {DataTableComponent} from "../../util/data_table/datatable.component";
import {ColumnComponent} from "../../util/data_table/column.component";
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Ng2PaginationModule
  ],
  declarations: [DataTableComponent,ColumnComponent]
})
export class DataTableModule {

}
