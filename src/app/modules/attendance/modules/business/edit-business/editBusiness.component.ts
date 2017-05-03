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
  listBusinessIdRelations: Business[]=[];
  openListBusiness = false; // lo dejare porque es uan variable que puede servir para q aparezca las relaciones si las hay
  msgs: Message[] = [];
  /* variables para la tabla */
  component: EditBusinessComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  dataPerPageR: number;
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
    this.getBusinessAndRelations(this.businessForm.value.business_id);
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

    }


  /**
   * Metodo que llama al servicio que llama todos los business segun si tiene business id o no
   * @param businessID
   */
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
       this.dataPerPageR = this.listBusiness.length;
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

  /**
   * Metodo que llama al servicio que solo obtiene un business segun el business ID que obtenga el parametro y
   * sus business asociados
   * @param businessID
   */
  getBusinessAndRelations(businessID: string): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          business_id: businessID,
          filter: this.actualQuery,
          sort: this.actualSort
        }
      }
    };
    this.businessService.getBusinessAndRelations(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.listBusinessIdRelations = response.ReaxiumResponse.object.data;

        console.log("listBusinessRelations= ", this.listBusinessIdRelations);
        for(let i=0;i<this.listBusinessIdRelations.length;i++){
          this.objects.push(this.listBusinessIdRelations[i].business_id);
        }
        if(this.objects.length>0){this.openListBusiness=true;}
        console.log("this.objects: ", this.objects);
      } else {
        this.listBusinessIdRelations = [];
      }
    });
  }

  /**
   * Metodo que llama el servicio para guardar o editar un nuevo business
   * @param business
   * @param userID
   * @param relationsID
   */
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
        summary:'Invalidated',
        detail: response.ReaxiumResponse.message//'The user is not master and it has to for create o update.'
      });
    }else if(response.ReaxiumResponse.code == Constants.SUCCESSFUL_RESPONSE_CODE){
      this.onCancel();
    }
  }

  /* metodos para la tabla */
  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      if(this.displayPopUp==true){
        this.getBusinessObservableCustom(this.businessForm.value.business_id);
      }else{
        this.getBusinessAndRelations(this.businessForm.value.business_id);
      }
    } else if (query.length > 2) {
      this.actualQuery = query;
      if(this.displayPopUp==true){
        this.getBusinessObservableCustom(this.businessForm.value.business_id);
      }else{
        this.getBusinessAndRelations(this.businessForm.value.business_id);
      }
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    if(this.displayPopUp==true){
      this.getBusinessObservableCustom(this.businessForm.value.business_id);
    }else{
      this.getBusinessAndRelations(this.businessForm.value.business_id);
    }
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    if(this.displayPopUp==true){
      this.getBusinessObservableCustom(this.businessForm.value.business_id);
    }else{
      this.getBusinessAndRelations(this.businessForm.value.business_id);
    }
  }


  onOptionSelected(option: DataTableOption,dataObject: any): void {
    if(this.displayPopUp!=true){
      this.options = this.options2;
    }
    switch (option.id){
      case "checkbox":
        if(this.searchObjList(dataObject.business_id)){
          this.deleteBusinessSelect(dataObject.business_id, this.objects);
          this.deleteBusinessRelationSelect(dataObject, this.listBusinessIdRelations);
        }else{
          this.objects.push(dataObject.business_id);
          this.listBusinessIdRelations.push(dataObject);
          this.openListBusiness=true;
        }
        console.log("this.objects: ", this.objects);
        console.log("this.listBusinessIdRelations: ", this.listBusinessIdRelations);
        break;
      case "delete":
        console.log("Borrando business: ");
        this.deleteBusinessSelect(dataObject.business_id, this.objects);
        this.deleteBusinessRelationSelect(dataObject, this.listBusinessIdRelations);
        console.log("this.objects: ", this.objects);
        break;
    }
  }

  /**
   *  Metodo que devuelve true si el parametro se encuentra en el arreglo this.objects
   * @param businessID
   * @returns {boolean}
   */
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

  deleteBusinessRelationSelect(BusinessID: any, objects: any[]): void{
    let index = -1;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].business_id == BusinessID) {
        index = i;
        break;
      }
    }

    objects.splice(index, 1);

    if(objects.length == 0){
      this.openListBusiness=false;
    }
  }

}
