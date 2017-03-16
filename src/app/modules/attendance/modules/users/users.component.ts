/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Users} from "./users";
@Component({
  selector: 'users-component',
  templateUrl: "./app/modules/attendance/modules/users/users.component.html",
  styleUrls: ["app/modules/attendance/modules/users/users.component.css"]
})
export class UsersComponent {

  users: Users[];

  constructor(private http: Http) {
    this.http.get('/app/data/users.json').subscribe(res => this.users = res.json() as Users[]);
  }

}
