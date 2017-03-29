/**
 * Created by Andreina on 3/24/2017.
 */
import {Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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

  private subscription: Subscription;
  private business: Business;
  private business2: any;
  private isNew = true;

  constructor(private route: ActivatedRoute,
              private businessService: BusinessService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    console.log('a dentro de ngOnInit');
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.business2 = this.businessService.getBusiness2();
        console.log('this.business', this.business2)
        if(this.business){
          console.log('HASOWNPROPERTY');
          this.isNew = false;

        } else {
          console.log('no HASOWNPROPERTY');
          this.isNew = true;
          this.business = null;
        }
        this.initForm();
        console.log('businessForm.Value', this.businessForm.value)
      }
    );
  }

  onSubmit(){
    console.log('businessForm', this.businessForm.value);
    console.log('businessForm.Value.busines_name', this.businessForm.value.business_name);
    const newBusiness = this.businessForm.value;
    this.businessService.addBusiness(newBusiness);
    /*this.onStore(this.businessForm.value.business_name,
                 this.businessForm.value.status_id,
                 this.businessForm.value.business_type_id,
                 this.businessForm.value.business_id_number);*/
    this.onStore();
    this.onCancel();
  }

  //ngOnDestroy(){
   // this.subscription.unsubscribe();
  //}

  onCancel(){
    this.navigateBack();
  }

  private navigateBack(){
    this.router.navigate(['attendance/business/table']);
  }

  private initForm(){
      let business_name = '';
      let business_id_number = '';
      let status_id = '';
      let business_type_id = '';

      if(!this.isNew){
        business_name = this.business.business_name;
        business_id_number = this.business.business_id_number;
        status_id = this.business.status_id;
        business_type_id = this.business.business_type_id;
      }

      this.businessForm = this.formBuilder.group({
        business_name: [business_name, Validators.required],
        business_id_number: [business_id_number, Validators.required],
        status_id: [status_id, Validators.required],
        business_type_id: [business_type_id, Validators.required]
      });
    }

  onStore(){//(businessName: string,statusID: string,businessType: string,businessIDnum: string){
    this.businessService.storeBusiness().subscribe(//(businessName,statusID,businessType,businessIDnum).subscribe(
      data => console.log(data),
      error => console.error
    );
  }
}
