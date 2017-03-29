/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Business } from "../business";
import { BusinessService } from "../business.service";
import {onDataTableListener } from "../../../../../util/data_table/onDataTableListener";
import { DataTableOption } from "../../../../../util/data_table/option";
import { Http } from "@angular/http";
import { BUSINESS_ROUTES } from "../business.routes";

@Component({
  selector: 'tableBusiness-component',
  templateUrl: "./app/modules/attendance/modules/business/table-business/tableBusiness.component.html",
  providers: [BusinessService]
})

export class TableBusinessComponent implements onDataTableListener,OnInit {
  business: Business[];
  component: TableBusinessComponent = this;
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

  constructor(private businessService: BusinessService,private http: Http,private router: Router) {
  }

  ngOnInit(): void {
    this.getBusinessObservable();
  }


  getBusinessObservable(): void {
    var parameters = {
      ReaxiumParameters: {
        Business: {
          filter: this.actualQuery,
          business_id:1,
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
        this.businessService.findBusinessID(option.id,dataObject.business_id);
        this.businessService.addBusiness(dataObject);
        this.router.navigate(['attendance/business/table/newBusiness']);
        break;
      case "delete":
        console.log("Borrando business: ");
        console.log(dataObject);
        break;
    }
  }

}
