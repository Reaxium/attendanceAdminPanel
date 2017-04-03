/**
 * Created by Andreina on 3/24/2017.
 */
import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Business } from "../business";
import { BusinessService } from "../business.service";


@Component({
  selector: 'edit-business-component',
  templateUrl: "./app/modules/attendance/modules/business/edit-business/editBusiness.component.html"

})
export class EditBusinessComponent implements OnInit{//, OnDestroy {
  businessForm: FormGroup;

  private business: Business;

  constructor(private route: ActivatedRoute,
              private businessService: BusinessService,
              private formBuilder: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
        this.route.params.subscribe(
          (params: any) => {
            console.log('params=', params);
            console.log('params1=', params.dataObject);
            console.log('params2=', params.userID2);
            this.initForm(params.dataObject);
          }
        );

  }

  onSubmit(){
    const newBusiness = this.businessForm.value;
    this.storeOrEditBusiness(newBusiness);
    this.onCancel();
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

  storeOrEditBusiness(business: Business){
    this.businessService.storeOrEditBusiness(business).subscribe(
      data => console.log(data),
      error => console.error
    );
  }
}
