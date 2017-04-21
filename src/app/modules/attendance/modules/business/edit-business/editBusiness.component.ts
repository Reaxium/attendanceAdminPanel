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
import {onDataTableListener} from "../../../../../util/data_table/onDataTableListener";
import {DataTableOption} from "../../../../../util/data_table/option";
import { DialogModule } from 'primeng/primeng';


@Component({
  selector: 'edit-business-component',
  templateUrl: "./app/modules/attendance/modules/business/edit-business/editBusiness.component.html"

})
export class EditBusinessComponent implements onDataTableListener,OnInit{//, OnDestroy {
  businessForm: FormGroup;
  listBusiness: Business[]=[];
  listBusinessRelations: Business[]=[];
  openListBusiness = false; // lo dejare porque es uan variable que puede servir para q aparezca las relaciones si las hay
  msgs: Message[] = [];
  /* variables para la tabla */
  component: EditBusinessComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  actualQuery: string = "";
  actualSort: string = "business_name";
  options: DataTableOption[] = [
    {
      id:"checkbox",
      src: "",
      className: "",
      type: "b",
      html: "",
      title:"Editar"
    }
  ];
  options2: DataTableOption[] = [
    {
      id:"delete",
      src: "",
      className: "fa fa-fw fa-trash",
      type: "a",
      html: "",
      title:"Borrar"
    }
  ];
  objects: any[]=[];
  displayPopUp: boolean;
  displayAlert: boolean = false;
  listBusinessType = ['Select Please','Worker', 'Owner', 'Master'];
  businessTypeId: string;


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
       // console.log("this.businessForm.value.business_id= ",this.businessForm.value.business_id);
       // this.getBusinessAndRelations(this.businessForm.value.business_id);
  }

  onSubmit(){
    console.log('onSubmit');
    const newBusiness = this.businessForm.value;
    const userInformation = sessionStorage.getItem('userInformation');
    console.log('userInformation=', JSON.parse(userInformation));
    const userID = JSON.parse(userInformation).userId;
    console.log('userId=', userID);
    this.storeOrEditBusiness(newBusiness,userID,this.objects);
    //this.onCancel();
  }

  onCancel(){
    this.navigateBack();
  }

  businessInformation(){
    if(this.businessForm.value.business_type_id != this.listBusinessType[0] && this.businessForm.value.business_type_id != this.listBusinessType[3]){
      this.displayPopUp = true;
      this.displayAlert = false;
    }else{
      this.displayPopUp = false;
      this.displayAlert = true;
    }
    this.getBusinessObservableCustom(this.businessForm.value.business_id);
  }

  closeBusinesInformation(){
    this.displayPopUp = false;
  }

  private navigateBack(){
    this.router.navigate(['attendance/business/table']);
  }

  private initForm(params:any){

    if(params.business_type_id == "1"){
      this.businessTypeId = "Worker";
    }else if(params.business_type_id == "2"){
      this.businessTypeId = "Owner";
    }else if(params.business_type_id == "3") {
      this.businessTypeId = "Master";
    }else if(params.business_type_id == null){
        this.businessTypeId = this.listBusinessType[0];
      }

      this.businessForm = this.formBuilder.group({
        business_id: [params.business_id],
        business_name: [params.business_name, Validators.required],
        business_id_number: [params.business_id_number, Validators.required],
        status_id: [params.status_id, Validators.required],
        business_type_id: [this.businessTypeId, Validators.required]
      });
       //this.getBusinessAndRelations(this.businessForm.value.business_id);
    }


  /*storeOrEditBusiness(business: Business, userID: string){
    this.businessService.storeOrEditBusiness(business,userID).subscribe(
      data => console.log(data),
      error => console.error  //(ResponseReaxium => this.getHandlerResponse(ResponseReaxium))
    );
  }*/

  getBusinessObservableCustom(businessID: string): void {
    console.log(' businessID de cuando quieres agregar ', businessID);
    if(businessID == null){businessID = "";}
   var parameters = {
     ReaxiumParameters: {
       Business: {
         filter: this.actualQuery,
         business_id: businessID,
         business_type_id: this.businessForm.value.business_type_id==this.listBusinessType[1]?"1":"2",
         page: this.actualPage,
         sort: this.actualSort,
         limit: this.dataPerPage
       }
     }
   };
   this.businessService.getBusinessObservable(parameters).subscribe(response => {
     if (response.ReaxiumResponse.code == 0) {
       this.totalItems = response.ReaxiumResponse.object.totalRecords;
       this.listBusiness = response.ReaxiumResponse.object.data;
       console.log("this.listBusiness= ",this.listBusiness[0]);
       for(let i=0;i<this.listBusiness.length;i++){
         if(this.searchObjList(this.listBusiness[i].business_id)){
           this.listBusiness[i].check = true;
         }
       }
     } else {
        this.listBusiness = [];
     }
   });
   }

  /*getBusinessAndRelations(businessID: string): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          business_id: businessID
        }
      }
    };
    this.businessService.getBusinessAndRelations(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.listBusinessRelations = response.ReaxiumResponse.object.data;
        this.getBusinessObservableCustom(this.businessForm.value.business_id);
        if(this.listBusinessRelations.length>0){this.openListBusiness=true;}
       // for(let i=0;i<this.listBusiness.length;i++){
       //   if(this.listBusiness[i].business_id==)
       // }
        console.log("listBusinessRelations= ", this.listBusinessRelations[0].business_relationship);
      } else {
        this.listBusinessRelations = [];
      }
    });
  }*/


  storeOrEditBusiness(business: Business, userID: string,relationsID: string[]){
    this.businessService.storeOrEditBusiness(business,userID,relationsID).subscribe(
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

  /* metodos para la tabla */
  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      this.getBusinessObservableCustom(this.businessForm.value.business_id);
    } else if (query.length > 2) {
      this.actualQuery = query;
      this.getBusinessObservableCustom(this.businessForm.value.business_id);
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getBusinessObservableCustom(this.businessForm.value.business_id);
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    this.getBusinessObservableCustom(this.businessForm.value.business_id);
  }


  onOptionSelected(option: DataTableOption,dataObject: any): void {
    switch (option.id){
      case "checkbox":
        if(this.searchObjList(dataObject.business_id)){
          this.deleteBusinessSelect(dataObject.business_id,this.objects);
        }else{
          this.objects.push(dataObject.business_id);
        }
        console.log("this.objects: ", this.objects);
        break;
      case "delete":
        console.log("Borrando business: ");
        console.log(dataObject);
        break;
    }
  }

  /**
   *  Metodo que devuelve true si el parametro se encuentra en el arreglo this.objects
   * @param businesID
   * @returns {boolean}
   */
  searchObjList(businesID: string): boolean{
    let validate = false;
    if (this.objects.length > 0) {
      for(let i=0;this.objects.length;i++){
        if(this.objects[i]==businesID){
          validate = true;
          i=this.objects.length;
        }
      }
    }
    return validate;
  }

  /**
   * Metodo que elimina el parametro que se introdujo del arreglo que introdujo en el segundo parametro
   * @param businesID
   * @param objects
   */

  deleteBusinessSelect(businesID: any, objects: any[]): void {
    let index: number = objects.indexOf(businesID);
    if (index !== -1) {
      objects.splice(index, 1);
    }
  }

}
