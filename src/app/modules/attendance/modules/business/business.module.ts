/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BusinessComponent} from "./business.component";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { DataTableModule } from "../../../../util/data_table/datatable.module";
import {BusinessService} from "./business.service";


@NgModule({
  imports: [BrowserModule,FormsModule,MaterialModule,DataTableModule],
  declarations: [BusinessComponent],
  bootstrap: [BusinessComponent],
  providers: [BusinessService],
})

export class BusinessModule {
}
