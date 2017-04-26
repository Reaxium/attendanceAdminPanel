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
export class EditDeviceComponent implements OnInit{
  deviceForm: FormGroup;
  listBusiness: Device[]=[];
  openListBusiness = false;
  msgs: Message[] = [];
  businessRelatedList: any[]=[];
  businessOwnerList: Business[]=[];
  businessWorkerdList: Business[]=[];
  //editBusiness: EditBusinessComponent; this.editBusiness.getBusinessObservableCustom(this.prueba); (usar clases nuevas)

  /* variables para la tabla */

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.initForm(params);
      }
    );
    //this.initForm("");
  }

  onSubmit(){
    console.log('onSubmit');
    const newDevice = this.deviceForm.value;
    const userInformation = sessionStorage.getItem('userInformation');
    const userID = JSON.parse(userInformation).userId;
    this.storeOrEditDevices(newDevice,userID);//,this.objects);
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
      device_serial: [params.device_serial, Validators.required]//,
      //business_owner_name: [params.business_owner_name, Validators.required],
      //business_owner_id: [params.business_owner_id, Validators.required],
      //business_worker_name: [params.business_worker_name, Validators.required],
      //business_worker_id: [params.business_worker_id, Validators.required]

    });

  }

  /* Servicios */

  storeOrEditDevices(device: Device, userID: string){//,relationsID: string[]){
    this.deviceService.storeOrEditDevices(device,userID).subscribe(//,relationsID).subscribe(
      //data => console.log(data),
      ResponseReaxium => this.getHandlerResponse(ResponseReaxium));
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

}
