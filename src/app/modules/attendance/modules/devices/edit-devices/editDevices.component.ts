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
  worker: boolean;
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
    console.log("this.worker", this.worker);
  }

  onSubmit(){
    this.getBusinessRelated(this.deviceForm.value.businessOwnerId);
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
      business_owner_id: [this.businessOwnerId, Validators.required],
      business_worker_name: [this.businessWorkerName, Validators.required],
      business_worker_id: [this.businessOwnerName, Validators.required]
    });

  }


  private listOfBusiness(businessTypeId: any,businessID: any){
    if(businessTypeId=="2" || this.businessOwnerName == 'Select Please'){
      this.owner = true;
      this.getAllBusinessByType(businessTypeId,"1");
      this.displayPopUp = true;
    }else if(businessTypeId=="1" || this.businessWorkerName == 'Select Please'){
      this.displayPopUp = true;
      this.owner = false;
      this.worker = true;
      this.getBusinessRelated(this.businessOwnerId);
    }
    console.log(this.businessList);
  }

  closeBusinesInformation(flat: boolean){
    this.displayPopUp = false;
    console.log("this.displayPopUp",this.displayPopUp)
    if(flat==true){
      if(this.businessOwnerName != 'Select Please'){
        this.worker = true;
      }else{
        this.worker = false;
      }
    }else if(flat==false){
      if(this.worker == true && this.businessWorkerName!='Select Please'){
        this.deleteBusinessSelect(this.businessWorkerId, this.objects);
        this.businessWorkerName = 'Select Please';
        this.businessWorkerId = '0';
        console.log("this.objects",this.objects);
      }else{
        this.deleteBusinessSelect(this.businessOwnerId, this.objects);
        this.deleteBusinessSelect(this.businessWorkerId, this.objects);
        this.businessOwnerName = 'Select Please';
        this.businessWorkerName = 'Select Please';
        this.businessOwnerId = '0';
        this.businessWorkerId = '0';
        console.log("this.objects",this.objects);
      }
    }
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

  getBusinessRelated(businessID: string): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          business_id: businessID,
          filter: this.actualQuery,
          page: this.actualPage,
          sort: this.actualSort,
          limit: this.dataPerPage
        }
      }
    };
    this.deviceService.getBusinessAndRelations(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.businessList = response.ReaxiumResponse.object.data;
        console.log("this.businessList= ",this.businessList);
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
      }else if(this.worker == true){
        this.getAllBusinessByType(this.businessWorkerType,null);
      }
    } else if (query.length > 2) {
      this.actualQuery = query;
      if(this.owner == true){
        this.getAllBusinessByType(this.businessOwnerType,null);
      }else if(this.worker == true){
        this.getAllBusinessByType(this.businessWorkerType,null);
      }
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    if(this.owner == true){
      this.getAllBusinessByType(this.businessOwnerType,null);
    }else if(this.worker == true){
      this.getAllBusinessByType(this.businessWorkerType,null);
    }
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    if(this.owner == true){
      this.getAllBusinessByType(this.businessOwnerType,null);
    }else if(this.worker == true){
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
          }else if(this.worker == true){
            this.deleteBusinessSelect(this.businessWorkerId, this.objects);
            this.objects.push(dataObject.business_id);
            this.businessWorkerId = dataObject.business_id;
            this.businessWorkerName =dataObject.business_name;
          }
        }
        break;
      case "delete":
        console.log("Borrando business: ");
        break;
    }
  }


}
