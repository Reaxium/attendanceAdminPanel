/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Business} from "./business";
import { BusinessService } from "./business.service";
import {onDataTableListener} from "../../../../util/data_table/onDataTableListener";

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

  constructor(private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.getBusiness();
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

  onDataTableSearch(query: string): void {
    if(query.length > 3){
      this.actualQuery = query;
      this.getBusiness();
    }else if (this.actualQuery == ""){
      this.actualQuery = "";
      this.getBusiness();
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getBusiness();
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    this.getBusiness();
  }
}
