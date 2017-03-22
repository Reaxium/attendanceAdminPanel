/**
 * Created by Eduardo Luttinger on 17/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Users} from "./users";
import {ResponseWithPagination} from "../../../../commons/beans/responseWithPagination";
@Injectable()
export class UsersService {

  private usersApiURL = "http://localhost/attendance_cloud/Users/getAllUsers";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  /**
   * Obtiene los usuarios de sistema
   * @returns {Promise<TResult|T>}
   */


  getUsers(parameters: any): Promise<ResponseWithPagination> {
    return this.http.post(this.usersApiURL, JSON.stringify(parameters), this.headers)
      .toPromise()
      .then(response => response.json() as ResponseWithPagination)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in users service', error);
    return Promise.reject(error.message || error);
  }

}
