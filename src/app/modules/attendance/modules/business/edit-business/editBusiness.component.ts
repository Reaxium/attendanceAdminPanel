/**
 * Created by Andreina on 3/24/2017.
 */
import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Business } from "../business";
import { BusinessService } from "../business.service";
import { Message } from 'primeng/primeng';
import {ResponseReaxium} from "../../../../login/services/responseReaxium";
import {Constants} from "../../../../../commons/global/global.constants";


@Component({
  selector: 'edit-business-component',
  templateUrl: "./app/modules/attendance/modules/business/edit-business/editBusiness.component.html"

})
export class EditBusinessComponent implements OnInit{//, OnDestroy {
  businessForm: FormGroup;
  msgs: Message[] = [];

  private business: Business;

  constructor(private route: ActivatedRoute,
              private businessService: BusinessService,
              private formBuilder: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
        this.route.params.subscribe(
          (params: any) => {
            this.initForm(params);
          }
        );

  }

  onSubmit(){
    const newBusiness = this.businessForm.value;
    const userInformation = sessionStorage.getItem('userInformation');
    console.log('userInformation=', JSON.parse(userInformation));
    const userID = JSON.parse(userInformation).userId;
    console.log('userId=', userID);
    this.storeOrEditBusiness(newBusiness,userID);
    //this.onCancel();
  }

  onCancel(){
    this.navigateBack();
  }

  private navigateBack(){
    this.router.navigate(['attendance/business/table']);
  }

  private initForm(params:any){

      this.businessForm = this.formBuilder.group({
        business_id: [params.business_id],
        business_name: [params.business_name, Validators.required],
        business_id_number: [params.business_id_number, Validators.required],
        status_id: [params.status_id, Validators.required],
        business_type_id: [params.business_type_id, Validators.required]
      });
    }

  /*storeOrEditBusiness(business: Business, userID: string){
    this.businessService.storeOrEditBusiness(business,userID).subscribe(
      data => console.log(data),
      error => console.error  //(ResponseReaxium => this.getHandlerResponse(ResponseReaxium))
    );
  }*/

  storeOrEditBusiness(business: Business, userID: string){
    this.businessService.storeOrEditBusiness(business,userID).subscribe(
      //data => console.log(data),
      ResponseReaxium => this.getHandlerResponse(ResponseReaxium));
  }

  getHandlerResponse(response:ResponseReaxium): void {
    if(response.ReaxiumResponse.code != Constants.SUCCESSFUL_RESPONSE_CODE){
      console.log("Error servicio: "+ response.ReaxiumResponse.message);
      this.msgs.push({
        severity:'warn',
        summary:'Invalidated User',
        detail:'The user is not master and it has to for create o update.'
      });
    }else if(response.ReaxiumResponse.code == Constants.SUCCESSFUL_RESPONSE_CODE){
      this.onCancel();
    }
  }

}
