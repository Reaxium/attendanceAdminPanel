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
      id:"",
      src: "",
      className: "fa fa-fw fa-pencil",
      type: "",
      html: "",
      title:"Editar"
    },
    {
      id:"",
      src: "",
      className: "fa fa-fw fa-trash",
      type: "",
      html: "",
      title:"Borrar"
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

  onOptionSelected(option: DataTableOption,dataObject: any): void {
    console.log(option.src);
    console.log(dataObject);
  }

}
