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
import {ResponseReaxium} from "../../../../login/services/responseReaxium";
import {Constants} from "../../../../../commons/global/global.constants";
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
  confirm: boolean;
  dataDelete: any;
  businessIdUser : string;
  msgs: Message[] = [];
  component: TableDevicesComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 10;
  actualQuery: string = "";
  actualSort: string = "device_name";
  master : boolean;
  userId : string;
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
    this.getDevicesObservable();
    const userTypeId = JSON.parse(userInformation).businessTypeId;
    this.master = userTypeId==3 ? true : false;
    this.userId = JSON.parse(userInformation).userId;
  }

  deleteItem(){
    this.deleteDevice(this.dataDelete);
    this.confirm = false;
    location.reload();
  }

  alert(data: any){
    this.dataDelete = data;
  }

  cancel(){
    this.confirm = false;
  }

  onCancel(){
    this.navigateBack();
  }

  private navigateBack(){
    this.router.navigate(['attendance/devices/table']);
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

  deleteDevice(device: Device){
    this.deviceService.deleteDevice(device,this.userId).subscribe(
      ResponseReaxium => this.getHandlerResponse(ResponseReaxium)
    );
  }

  getHandlerResponse(response:ResponseReaxium): void {
    if(response.ReaxiumResponse.code != Constants.SUCCESSFUL_RESPONSE_CODE){
      console.log("Error servicio: "+ response.ReaxiumResponse.message);
      this.msgs.push({
        severity:'warn',
        summary:'Invalidated',
        detail: response.ReaxiumResponse.message
      });
    }else if(response.ReaxiumResponse.code == Constants.SUCCESSFUL_RESPONSE_CODE){
      this.onCancel();
    }
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
        //this.deleteDevice(dataObject);
        this.confirm = true;
        this.alert(dataObject);
        break;
    }
  }


}
