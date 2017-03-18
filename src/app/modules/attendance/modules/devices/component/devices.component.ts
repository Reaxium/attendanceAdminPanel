/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {onDataTableListener} from "../../../../../util/data_table/onDataTableListener";
import {DataTableOption} from "../../../../../util/data_table/option";
import {Device} from "../../../../../commons/beans/device";
import {DeviceService} from "../service/device.service";
@Component({
  selector: 'devices-component',
  templateUrl: "./app/modules/attendance/modules/devices/component/devices.component.html",
  styleUrls: ["app/modules/attendance/modules/devices/component/devices.component.css"],
  providers:[DeviceService]
})
export class DevicesComponent implements OnInit, onDataTableListener {

  devices: Device[];
  component: DevicesComponent = this;
  actualPage: number = 1;
  totalItems: number = 7;
  dataPerPage: number = 2;
  actualQuery: string = "";
  actualSort: string = "first_name";
  options: DataTableOption[] = [
    {
      src: "Opcion 1",
      className: "",
      type: "",
      html: ""
    },
    {
      src: "Opcion 2",
      className: "",
      type: "",
      html: ""
    }
  ];


  constructor(private deviceService: DeviceService){

  }

  ngOnInit(): void {
    this.deviceService.getDevicesSimulation().then(res => this.devices = res);
  }

  onDataTableSearch(query: string): void {

  }

  onSortByColumn(columnIdName: String): void {

  }

  onPageChange(page: number): void {
    this.actualPage = page;
  }

  onOptionSelected(option: DataTableOption): void {

  }

}
