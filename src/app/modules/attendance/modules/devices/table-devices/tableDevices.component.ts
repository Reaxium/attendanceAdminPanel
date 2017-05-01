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
  businessIdUser : string;
  msgs2: Message[] = [];
  component: TableDevicesComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 10;
  actualQuery: string = "";
  actualSort: string = "device_name";
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
    const userInformation = sessionStorage.getItem('userInformation');
    this.businessIdUser = JSON.parse(userInformation).businessId;
    console.log("BUSINES ID USER",this.businessIdUser);
    this.getDevicesObservable();
    const userTypeId = JSON.parse(userInformation).businessTypeId;
    //this.master = userTypeId==3 ? true : false;

  }

  /**
   * Metodo para llamar al servidor y obtener todos los devices con estaus igual a 1
   */
  getDevicesObservable(): void {
    var parameters = {
        ReaxiumParameters: {
          ReaxiumDevice: {
            page: this.actualPage,
            limit: this.dataPerPage,
            sort: this.actualSort,
            filter: this.actualQuery,
            business_id:this.businessIdUser
          }
        }
    };
    this.deviceService.getDevicesObservable(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.devices = response.ReaxiumResponse.object.data;
        console.log("devices[0]",this.devices[0]);
        console.log("response.ReaxiumResponse.object.data= ",response.ReaxiumResponse.object.data);
      } else {
        this.devices = [];
      }
    });
  }

  /* Metodos para la tabla */
  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      this.getDevicesObservable();
    } else if (query.length > 2) {
      this.actualQuery = query;
      this.getDevicesObservable();
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getDevicesObservable();
  }

  onPageChange(page: number): void {
    this.actualPage = page;
    this.getDevicesObservable();
  }

  onOptionSelected(option: DataTableOption,dataObject: any): void {
    switch (option.id){
      case "edit":
        console.log("Editando device: ");
        console.log(dataObject);
        this.router.navigate(['attendance/devices/table/newDevice', dataObject]);//, dataObject]);
        break;
      case "delete":
        console.log("Borrando device: ");
        console.log(dataObject);
        //this.deleteBusiness(dataObject);
        break;
    }
  }


}
