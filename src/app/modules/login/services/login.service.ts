/**
 * Created by VladimirIlich on 16/3/2017.
 */
import {Injectable} from '@angular/core';
import  {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ResponseReaxium} from './responseReaxium';
import {Constants} from '../../../commons/global/global.constants'


@Injectable()
export class LoginUserService{



  constructor(private http: Http){}

  getAccessUsers(request:any) : Promise<ResponseReaxium>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(Constants.LOGIN_URL,JSON.stringify(request),options)
      .toPromise()
      .then(response => response.json() as ResponseReaxium)
      .catch(this.handleError)
  }

  private handleError(error: Response | any){
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
