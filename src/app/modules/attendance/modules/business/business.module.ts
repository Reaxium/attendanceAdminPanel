/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BusinessComponent} from "./business.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { DataTableModule } from "../../../../util/data_table/datatable.module";
import {BusinessService} from "./business.service";
import {BUSINESS_ROUTES} from "./business.routes";
import { RouterModule, Routes } from '@angular/router';
import { EditBusinessComponent } from "./edit-business/editBusiness.component";
import { TableBusinessComponent } from "./table-business/tableBusiness.component";
import {InputTextModule,GrowlModule,CheckboxModule}  from 'primeng/primeng';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTableModule,
    RouterModule.forRoot(BUSINESS_ROUTES),
    InputTextModule,
    GrowlModule,
    CheckboxModule],
  declarations: [
    BusinessComponent,
    EditBusinessComponent,
    TableBusinessComponent
    ],
  bootstrap: [BusinessComponent],
  providers: [BusinessService],
})

export class BusinessModule {
}
