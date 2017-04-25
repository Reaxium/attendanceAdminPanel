/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {onDataTableListener} from "../../../../../util/data_table/onDataTableListener";
import {DeviceService} from "../device.service";
import {DataTableOption} from "../../../../../util/data_table/option";
import {Device} from "../devices";
import {Message} from "primeng/components/common/api";
import {Router} from "@angular/router";
@Component({
  selector: 'tableDevices-component',
  templateUrl: "./app/modules/attendance/modules/devices/table-devices/tableDevices.component.html",
  providers:[DeviceService]
})
export class TableDevicesComponent implements onDataTableListener,OnInit {
  get options(): DataTableOption[] {
    return this._options;
  }

  set options(value: DataTableOption[]) {
    this._options = value;
  }
  devices: Device[];
  msgs2: Message[] = [];
  component: TableDevicesComponent = this;
  actualPage: number = 1;
  totalItems: number = 7;
  dataPerPage: number = 2;
  actualQuery: string = "";
  actualSort: string = "first_name";
  private _options: DataTableOption[] = [
    {
      id:"edit",
      src: "",
      className: "fa fa-fw fa-pencil",
      type: "a",
      html: "",
      title:"Editar"
    },
    {
      id:"delete",
      src: "",
      className: "fa fa-fw fa-trash",
      type: "a",
      html: "",
      title:"Borrar"
    }
  ];


  constructor(private deviceService: DeviceService,private router: Router){

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
    switch (option.id){
      case "edit":
        console.log("Editando business: ");
        console.log(dataObject);
        this.router.navigate(['attendance/device/table/newDevice']);//, dataObject]);
        break;
      case "delete":
        console.log("Borrando business: ");
        console.log(dataObject);
        //this.deleteBusiness(dataObject);
        break;
    }
  }


}
