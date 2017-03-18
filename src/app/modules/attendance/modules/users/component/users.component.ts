/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {UsersService} from "../service/users.service"
import {Users} from "../../../../../commons/beans/users";

import {onDataTableListener} from "../../../../../util/data_table/onDataTableListener";
import {Http} from "@angular/http";
import {DataTableOption} from "../../../../../util/data_table/option";

@Component({
  selector: 'users-component',
  templateUrl: "./app/modules/attendance/modules/users/component/users.component.html",
  styleUrls: ["app/modules/attendance/modules/users/component/users.component.css"],
  providers: [UsersService]
})
export class UsersComponent implements onDataTableListener, OnInit {


  users: Users[];
  component: UsersComponent = this;
  actualPage: number = 1;
  totalItems: number = 0;
  dataPerPage: number = 5;
  actualQuery: string = "";
  actualSort: string = "first_name";
  options: DataTableOption[] = [
    {
      src: "Opcion 1",
      className: "",
      type: "",
      html: ""
    },
    {
      src: "Opcion 2",
      className: "",
      type: "",
      html: ""
    }
  ];

  constructor(private usersService: UsersService, private http: Http) {
  }

  ngOnInit(): void {
    this.getUsersObservable();
  }

  getUsers(): void {
    var parameters = {
      ReaxiumParameters: {
        Users: {
          business_id: 1,
          filter: this.actualQuery,
          page: this.actualPage,
          sort: this.actualSort,
          limit: this.dataPerPage
        }
      }
    };

    this.usersService.getUsers(parameters).then(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.users = response.ReaxiumResponse.object.data;
      } else {
        this.users = [];
      }
    });
  }

  onDataTableSearch(query: string): void {
    if (query == "") {
      this.actualQuery = "";
      this.getUsersObservable();
    } else if (query.length > 3) {
      this.actualQuery = query;
      this.getUsersObservable();
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getUsersObservable();
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    this.getUsersObservable();
  }

  onOptionSelected(option: DataTableOption): void {
      console.log(option.src);
  }


  getUsersObservable(): void {
    var parameters = {
      ReaxiumParameters: {
        Users: {
          business_id: 1,
          filter: this.actualQuery,
          page: this.actualPage,
          sort: this.actualSort,
          limit: this.dataPerPage
        }
      }
    };
    this.usersService.getUsersObservable(parameters).subscribe(response => {
      if (response.ReaxiumResponse.code == 0) {
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.users = response.ReaxiumResponse.object.data;
      } else {
        this.users = [];
      }
    });
  }

}
