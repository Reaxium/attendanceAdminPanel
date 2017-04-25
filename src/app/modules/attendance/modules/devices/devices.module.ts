/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DataTableModule} from "../../../../util/data_table/datatable.module";
import {DevicesComponent} from "./devices.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {GrowlModule} from "primeng/components/growl/growl";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {DialogModule} from "primeng/components/dialog/dialog";
import {TableDevicesComponent} from "./table-devices/tableDevices.component";
import {DeviceService} from "./device.service";
import {DEVICES_ROUTES} from "./devices.routes";
import {EditDeviceComponent} from "./edit-devices/editDevices.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTableModule,
    RouterModule.forRoot(DEVICES_ROUTES),
    InputTextModule,
    GrowlModule,
    CheckboxModule,
    DialogModule
           ],
  declarations: [
    DevicesComponent,
    TableDevicesComponent,
    EditDeviceComponent
  ],
  bootstrap: [DevicesComponent],
  providers: [DeviceService],
})

export class DevicesModule {

}
