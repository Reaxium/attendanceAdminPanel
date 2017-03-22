/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */

import {Component, OnInit, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Business} from "./business";
import { BusinessService } from "./business.service";
import {onDataTableListener} from "../../../../util/data_table/onDataTableListener";
import {DataTableOption} from "../../../../util/data_table/option";
import {Http} from "@angular/http";

@Component({
  selector: 'business-component',
  templateUrl: "./app/modules/attendance/modules/business/business.component.html",
  styleUrls: ["app/modules/attendance/modules/business/business.component.css"],
  providers: [BusinessService]
})
export class BusinessComponent implements onDataTableListener,OnInit {
  business: Business[];
  component: BusinessComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  actualQuery: string = "";
  actualSort: string = "business_name";
  options: DataTableOption[] = [
    {
      id:"edit",
      src: "",
      className: "fa fa-fw fa-pencil",
      type: "",
      html: "",
      title:"Editar"
    },
    {
      id:"delete",
      src: "",
      className: "fa fa-fw fa-trash",
      type: "",
      html: "",
      title:"Borrar"
    }
  ];

  constructor(private businessService: BusinessService,private http: Http) {
  }

  ngOnInit(): void {
    this.getBusinessObservable();
  }

  getBusiness(): void {
      var parameters = {
        ReaxiumParameters: {
          Business: {
            business_id: 1,
            filter: this.actualQuery,
            page: this.actualPage,
            sort: this.actualSort,
            limit: this.dataPerPage
          }
        }
      };
    this.businessService.getBusiness(parameters).then(response => {
      if(response.ReaxiumResponse.code == 0){
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.business = response.ReaxiumResponse.object.data;
      }else{
        this.business = [];
      }
    });
  }

  getBusinessObservable(): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          business_id: 1,
          filter: this.actualQuery,
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
      } else {
        this.business = [];
      }
    });
  }

  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      this.getBusinessObservable();
    } else if (query.length > 3) {
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

  onOptionSelected(option: DataTableOption,dataObject: any): void {
    switch (option.id){
      case "edit":
        console.log("Editando business: ");
        console.log(dataObject);
        break;
      case "delete":
        console.log("Borrando business: ");
        console.log(dataObject);
        break;
    }
  }
}
