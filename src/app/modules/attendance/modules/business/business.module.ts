/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BusinessComponent} from "./business.component";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {DataTableComponent} from "../../../../util/data_table/datatable.component";
import {ColumnComponent} from "../../../../util/data_table/column.component";
import {DataTableModule} from "../../../../util/data_table/datatable.module";

@NgModule({
  imports: [BrowserModule,FormsModule,MaterialModule],
  declarations: [BusinessComponent],
  bootstrap: [BusinessComponent]
})

export class BusinessModule {
}
