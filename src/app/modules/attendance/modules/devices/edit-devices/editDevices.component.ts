/**
 * Created by Andreina on 3/24/2017.
 */
import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Message } from 'primeng/primeng';
import {ResponseReaxium} from "../../../../login/services/responseReaxium";
import {Constants} from "../../../../../commons/global/global.constants";
import {onDataTableListener} from "../../../../../util/data_table/onDataTableListener";
import {DataTableOption} from "../../../../../util/data_table/option";
import { DialogModule } from 'primeng/primeng';
import {DeviceService} from "../device.service";
import {Device} from "../devices";
import {Business} from "../../business/business";
import {EditBusinessComponent} from "../../business/edit-business/editBusiness.component";


@Component({
  selector: 'edit-device-component',
  templateUrl: "./app/modules/attendance/modules/devices/edit-devices/editDevices.component.html"

})
export class EditDeviceComponent implements onDataTableListener,OnInit{
  deviceForm: FormGroup;
  msgs: Message[] = [];
  businessRelatedToDevice: Business[]=[];
  businessList: Business[]=[];
  businessOwnerName = 'Select Please';
  businessOwnerId = '0';
  businessOwnerType = '0';
  businessWorkerName = 'Select Please';
  businessWorkerId = '0';
  businessWorkerType = '0';
  displayPopUp: boolean;
  owner: boolean;
  //editBusiness: EditBusinessComponent; this.editBusiness.getBusinessObservableCustom(this.prueba); (usar clases nuevas)

  /* variables para la tabla */
  component: EditDeviceComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  actualQuery: string = "";
  actualSort: string = "business_name";
  options: DataTableOption[] = [
    {
      id:"radio",
      src: "",
      className: "",
      type: "c",
      html: "",
      title:"Editar"
    }
  ];
  objects: any[]=[];

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    //this.getAllBusinessByType(1,null);
    this.route.params.subscribe(
      (params: any) => {
        this.initForm(params);
        this.getBusinessRelatedToDevice(params.device_id);
      }
    );
  }

  onSubmit(){
    console.log('onSubmit');
    console.log("this.businessOwnerList",this.businessList);
    const newDevice = this.deviceForm.value;
    const userInformation = sessionStorage.getItem('userInformation');
    const userID = JSON.parse(userInformation).userId;
    this.storeOrEditDevices(newDevice,userID,this.objects);
  }

  onCancel(){
    this.navigateBack();
  }

  private navigateBack(){
    this.router.navigate(['attendance/devices/table']);
  }

  private initForm(params:any){

    this.deviceForm = this.formBuilder.group({
      device_id: [params.device_id],
      device_name: [params.device_name, Validators.required],
      device_serial: [params.device_serial, Validators.required],
      business_owner_name: [this.businessOwnerName, Validators.required],
      business_owner_id: [this.businessOwnerId, Validators.required]
      //business_worker_name: [params.business_worker_name, Validators.required],
      //business_worker_id: [params.business_worker_id, Validators.required]
    });

  }

  private listOfBusiness(businessTypeId: any,businessID: any){
    console.log("businessTypeId",businessTypeId);
    this.owner = businessTypeId=="2"?true:false;
    businessTypeId = businessTypeId=="1"?"2":"1";
    this.getAllBusinessByType(businessTypeId,businessID);
    this.displayPopUp = true;
  }

  closeBusinesInformation(){
    this.displayPopUp = false;
  }

  searchObjList(businessID: string): boolean{
    let validate = false;
    if (this.objects.length > 0) {
      for(let i=0;i<this.objects.length;i++){
        if(this.objects[i]==businessID){
          validate = true;
          i=this.objects.length;
        }
      }
    }
    return validate;
  }

  deleteBusinessSelect(BusinessID: any, objects: any[]): void{
      let index: number = objects.indexOf(BusinessID);
      objects.splice(index, 1);
  }

  /* Servicios */

  storeOrEditDevices(device: Device, userID: string,relationsID: string[]){
    this.deviceService.storeOrEditDevices(device,userID,relationsID).subscribe(
      //data => console.log(data),
      ResponseReaxium => this.getHandlerResponse(ResponseReaxium));
  }

  getAllBusinessByType(businessTypeId: any,businessID: any) {
    console.log(' businessID de cuando quieres agregar ', businessID);
    if(businessID == null){businessID = "";}
    var parameters = {
      ReaxiumParameters: {
        Business: {
          filter: this.actualQuery,
          business_id: businessID,
          business_type_id: businessTypeId,
          page: this.actualPage,
          sort: this.actualSort,
          limit: this.dataPerPage
        }
      }
    };
    this.deviceService.getAllBusinessByType(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.businessList = response.ReaxiumResponse.object.data;
        console.log("this.businessOwnerList= ",this.businessList);
        for(let i=0;i<this.businessList.length;i++){
          if(this.searchObjList(this.businessList[i].business_id)){
            this.businessList[i].check = true;
          }
        }
      } else {
        this.businessList = [];
      }
    });
  }

  getBusinessRelatedToDevice(deviceID: string): void {
    var parameters = {
      ReaxiumParameters: {
        ReaxiumDevice: {
          device_id: deviceID
        }
      }
    };
    this.deviceService.getBusinessRelatedToDevice(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.businessRelatedToDevice = response.ReaxiumResponse.object.data;
        console.log("listBusinessRelations= ", this.businessRelatedToDevice);
        for(let i=0;i<this.businessRelatedToDevice.length;i++){
          this.objects.push(this.businessRelatedToDevice[i].business_id); // es para que se haga el chek cuando se abra la tabla de workers
          if(this.businessRelatedToDevice[i].business_type_id == "2"){
            this.businessOwnerName = this.businessRelatedToDevice[i].business_name;
            this.businessOwnerId = this.businessRelatedToDevice[i].business_id;
            this.businessOwnerType = this.businessRelatedToDevice[i].business_type_id;
          }else if(this.businessRelatedToDevice[i].business_type_id == "1"){
            this.businessWorkerName = this.businessRelatedToDevice[i].business_name;
            this.businessWorkerId = this.businessRelatedToDevice[i].business_id;
            this.businessWorkerType = this.businessRelatedToDevice[i].business_type_id;
          }
        }
      } else {
        this.businessRelatedToDevice = [];
      }
    });
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
      if(this.owner == true){
        this.getAllBusinessByType(this.businessOwnerType,null);
      }else {
        this.getAllBusinessByType(this.businessWorkerType,null);
      }
    } else if (query.length > 2) {
      this.actualQuery = query;
      if(this.owner == true){
        this.getAllBusinessByType(this.businessOwnerType,null);
      }else {
        this.getAllBusinessByType(this.businessWorkerType,null);
      }
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    if(this.owner == true){
      this.getAllBusinessByType(this.businessOwnerType,null);
    }else {
      this.getAllBusinessByType(this.businessWorkerType,null);
    }
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    if(this.owner == true){
      this.getAllBusinessByType(this.businessOwnerType,null);
    }else {
      this.getAllBusinessByType(this.businessWorkerType,null);
    }
  }


  onOptionSelected(option: DataTableOption,dataObject: any): void {
    switch (option.id){
      case "radio":
        if(!this.searchObjList(dataObject.business_id)){
          if(this.owner==true){
            this.deleteBusinessSelect(this.businessOwnerId, this.objects);
            this.objects.push(dataObject.business_id);
            this.businessOwnerId = dataObject.business_id;
            this.businessOwnerName =dataObject.business_name;
            console.log("this.businessOwnerId2",this.businessOwnerId);
            console.log("this.businessOwnerName2",this.businessOwnerName);
          }else{
            console.log("ENTRO EN WORKER");
            console.log("owner",this.owner);
            this.deleteBusinessSelect(this.businessWorkerId, this.objects);
            this.objects.push(dataObject.business_id);
            this.businessWorkerId = dataObject.business_id;
            this.businessWorkerName =dataObject.business_name;
          }
        }
        console.log("this.objects",this.objects);
        console.log("this.businessOwnerId",this.businessOwnerId);
        console.log("this.businessOwnerName",this.businessOwnerName);
        break;
      case "delete":
        console.log("Borrando business: ");
        break;
    }
  }


}
