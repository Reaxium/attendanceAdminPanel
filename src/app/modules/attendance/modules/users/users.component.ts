/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users/users.service"
import {Users} from "./users";
import {onDataTableListener} from "../../../../util/data_table/onDataTableListener";
@Component({
  selector: 'users-component',
  templateUrl: "./app/modules/attendance/modules/users/users.component.html",
  styleUrls: ["app/modules/attendance/modules/users/users.component.css"],
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

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
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
      if(response.ReaxiumResponse.code == 0){
        this.totalItems = response.ReaxiumResponse.object.totalRecords;
        this.users = response.ReaxiumResponse.object.data;
      }else{
        this.users = [];
      }
    });
  }

  onDataTableSearch(query: string): void {
    if(query.length > 3){
      this.actualQuery = query;
      this.getUsers();
    }else if (this.actualQuery == ""){
      this.actualQuery = "";
      this.getUsers();
    }
  }

  onSortByColumn(columnName: string): void {
    this.actualSort = columnName;
    this.getUsers();
  }


  onPageChange(page: number): void {
    this.actualPage = page;
    this.getUsers();
  }

}
