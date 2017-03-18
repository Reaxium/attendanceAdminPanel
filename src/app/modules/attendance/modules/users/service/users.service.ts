/**
 * Created by Eduardo Luttinger on 17/03/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Users} from "../../../../../commons/beans/users";
import {ResponseWithPagination} from "../../../../../commons/beans/responseWithPagination";
import {Observable} from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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

  getUsersObservable(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.usersApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in users service', error);
    return Promise.reject(error.message || error);
  }

}
