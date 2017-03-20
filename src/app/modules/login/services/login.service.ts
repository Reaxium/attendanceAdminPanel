/**
 * Created by VladimirIlich on 16/3/2017.
 */
import {Injectable} from '@angular/core';
import  {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ResponseReaxium} from '../../../commons/beans/ResponseReaxium';



@Injectable()
export class LoginUserService{

  private loginUrl = 'http://localhost:8080/ProyectosGAndG/attendance_cloud/Access/accessUserWebPortal';

  constructor(private http: Http){}

  getAccessUsers(request:any) : Promise<ResponseReaxium>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.loginUrl,JSON.stringify(request),options)
      .toPromise()
      .then(response => response.json() as ResponseReaxium)
      .catch(this.handleError)
  }

  private handleError(error: Response | any){
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
