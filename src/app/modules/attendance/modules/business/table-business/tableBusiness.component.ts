/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Business } from "../business";
import { BusinessService } from "../business.service";
import { onDataTableListener } from "../../../../../util/data_table/onDataTableListener";
import { DataTableOption } from "../../../../../util/data_table/option";
import { Http } from "@angular/http";
import { BUSINESS_ROUTES } from "../business.routes";
import {ResponseReaxium} from "../../../../login/services/responseReaxium";
import {Constants} from "../../../../../commons/global/global.constants";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'tableBusiness-component',
  templateUrl: "./app/modules/attendance/modules/business/table-business/tableBusiness.component.html",
  providers: [BusinessService]
})

export class TableBusinessComponent implements onDataTableListener,OnInit {
  get options(): DataTableOption[] {
    return this._options;
  }

  set options(value: DataTableOption[]) {
    this._options = value;
  }

  master : boolean;
  userId : string;
  msgs2: Message[] = [];
  business: Business[];
  component: TableBusinessComponent = this;
  confirm: boolean;
  dataDelete: any;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  actualQuery: string = "";
  actualSort: string = "business_name";
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

  constructor(private route: ActivatedRoute,private businessService: BusinessService,private http: Http,private router: Router) {
  }

  ngOnInit(): void {
      this.getBusinessObservable();
      const userInformation = sessionStorage.getItem('userInformation');
      const userTypeId = JSON.parse(userInformation).businessTypeId;
      this.master = userTypeId==3 ? true : false;
      this.userId = JSON.parse(userInformation).userId;
  }

  deleteItem(): void {
    this.deleteBusiness(this.dataDelete);
    this.confirm = false;
    location.reload();//preguntar porque se carga tooooda la pagina y seria fino q solo la tabla.
  }

  alert(data: any): void {
    this.dataDelete = data;
  }

  onCancel(): void {
    this.confirm = false;
  }

  getBusinessObservable(): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          filter: this.actualQuery,
          business_id:"",
          business_type_id:"",
          page: this.actualPage,
          sort: this.actualSort,
          limit: this.dataPerPage
        }
      }
    };
    this.businessService.getBusinessObservable(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.business = response.ReaxiumResponse.object.data;
        console.log("this.business",this.business);
      } else {
        this.business = [];
      }
    });
  }

  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      this.getBusinessObservable();
    } else if (query.length > 2) {
      this.actualQuery = query;
      this.getBusinessObservable();
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getBusinessObservable();
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    this.getBusinessObservable();
  }

  deleteBusiness(business: Business){
    this.businessService.deleteBusiness(business,this.userId).subscribe(
      //data => console.log(data),
      //error => console.error
      ResponseReaxium => this.getHandlerResponse(ResponseReaxium)
    );
  }

  onOptionSelected(option: DataTableOption,dataObject: any): void {
    switch (option.id){
      case "edit":
        console.log("Editando business: ");
        console.log(dataObject);
        this.router.navigate(['attendance/business/table/newBusiness', dataObject]);
        break;
      case "delete":
        console.log("Borrando business: ");
        console.log(dataObject);
        this.confirm = true;
        this.alert(dataObject);
        //this.deleteBusiness(dataObject);
        break;
    }
  }


  getHandlerResponse(response:ResponseReaxium): void {
    if(response.ReaxiumResponse.code != Constants.SUCCESSFUL_RESPONSE_CODE){
      console.log("Error servicio: "+ response.ReaxiumResponse.message);
      this.msgs2.push({
        severity:'warn',
        summary:'Invalidated User',
        detail: 'The user is not master and it has to for create o update.'
      });
    }
  }
}
