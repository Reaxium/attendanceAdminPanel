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


@Component({
  selector: 'edit-device-component',
  templateUrl: "./app/modules/attendance/modules/devices/edit-devices/editDevices.component.html"

})
export class EditDeviceComponent implements OnInit{
  deviceForm: FormGroup;
  listBusiness: Device[]=[];
  openListBusiness = false;
  msgs: Message[] = [];
  /* variables para la tabla */

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    /*this.route.params.subscribe(
      (params: any) => {
        this.initForm(params);
      }
    );*/
    this.initForm("");
  }

  onSubmit(){
    console.log('onSubmit');
    const newBusiness = this.deviceForm.value;
    const userInformation = sessionStorage.getItem('userInformation');
    const userID = JSON.parse(userInformation).userId;
    //this.storeOrEditBusiness(newBusiness,userID,this.objects);
    //this.onCancel();
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
      device_description: [params.device_description, Validators.required],
      device_serial: [params.device_serial, Validators.required]
    });

  }


}
