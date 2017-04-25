/**
 * Created by Andreina on 3/15/2017.
 */
import { RouterModule, Routes } from "@angular/router";
import {TableDevicesComponent} from "./table-devices/tableDevices.component";
import {EditDeviceComponent} from "./edit-devices/editDevices.component";

export const DEVICES_ROUTES: Routes = [
  { path: 'table', component: TableDevicesComponent},
  { path: 'table/newDevice',component: EditDeviceComponent}
];
