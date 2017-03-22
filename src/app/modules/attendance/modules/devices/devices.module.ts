/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DevicesComponent} from "./component/devices.component";
import {DataTableModule} from "../../../../util/data_table/datatable.module";

@NgModule({
  imports: [BrowserModule,DataTableModule],
  declarations: [DevicesComponent],
  bootstrap: [DevicesComponent]
})

export class DevicesModule {

}
