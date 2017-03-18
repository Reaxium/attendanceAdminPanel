/**
 * Created by VladimirIlich on 16/3/2017.
 */
import {Injectable} from '@angular/core';
import  {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ResponseReaxium} from '../objects/ResponseReaxium';



@Injectable()
export class LoginUserService{

  private loginUrl = 'http://localhost:8080/ProyectosGAndG/attendance_cloud/Access/accessUserWebPortal';

  constructor(private http: Http){}

  getAccessUsers(request:any) : Observable<ResponseReaxium>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.loginUrl,JSON.stringify(request),options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }

  private handleError(error: Response | any){
    console.error('error');
    return Observable.throw("Error");
  }
}
