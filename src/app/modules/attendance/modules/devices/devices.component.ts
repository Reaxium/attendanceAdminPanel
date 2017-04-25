/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {onDataTableListener} from "../../../../util/data_table/onDataTableListener";
import {Device} from "./devices";
import {DataTableOption} from "../../../../util/data_table/option";
import {DeviceService} from "./device.service";
import {Router} from "@angular/router";
@Component({
  selector: 'devices-component',
  templateUrl: "./app/modules/attendance/modules/devices/devices.component.html",
  styleUrls: ["app/modules/attendance/modules/devices/devices.component.css"],
  providers:[DeviceService]
})
export class DevicesComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['attendance/devices/table']);
  }

}/**
 * Created by eduardo on 4/24/2017.
 */


