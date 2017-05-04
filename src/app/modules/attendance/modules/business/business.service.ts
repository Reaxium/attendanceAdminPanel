import { Injectable } from '@angular/core';
import { Business } from './business';

import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ResponseWithPagination} from "../../../../commons/beans/responseWithPagination";
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
import {ResponseReaxium} from "../../../login/services/responseReaxium";

@Injectable()
export class BusinessService {
  private business: Business;
  private businessGetApiURL = "http://localhost:8000/attendance_cloud/Business/allBusinessFiltered";
  private businessGetRelations = "http://localhost:8000/attendance_cloud/Business/getBusinessRelations";
  private businessStoreApiURL = "http://localhost:8000/attendance_cloud/Business/createBusiness";
  private businessDeleteApiURL = "http://localhost:8000/attendance_cloud/Business/deleteBusiness";
  //private businesssApiURL = "http://34.208.166.161/school_bus_cloud/Business/allBusinessFiltered";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  /**
   * Obtiene los business del sistema
   * @returns {Promise<TResult|T>}
   */

  /*getBusinessSimulation(): Promise<Business[]> {
    return this.http.get("/app/data/business.json").toPromise().then(response => this.business = response.json() as Business[]);
  }*/

  getBusiness(parameters: any): Promise<ResponseWithPagination> {
    return this.http.post(this.businessGetApiURL, JSON.stringify(parameters), this.headers)
      .toPromise()
      .then(response => response.json() as ResponseWithPagination)
      .catch(this.handleError);
  }

  /**
   * Se obtienen todos los busines con status = 1, paginacion y filtrado.
   * @param parameters
   * @returns {Observable<R>}
   */
  getBusinessObservable(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.businessGetApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  /**
   * Se obtienen los business relacionados al business enviado.
   * @param parameters
   * @returns {Observable<R>}
   */
  getBusinessAndRelations(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.businessGetRelations, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  /**
   *
   * Llama al servicio para crear o editar un business
   * @param business
   * @param userID
   * @param relationsID
   * @returns {Observable<R>}
   */
  storeOrEditBusiness(business: Business, userID: string, relationsID: string[]){
    if(business.business_type_id == "Worker"){
      business.business_type_id = "1";
    }else if(business.business_type_id == "Owner"){
      business.business_type_id = "2";
    }else if(business.business_type_id == "Master"){
      business.business_type_id = "3";
    }
      var parameters = {
        ReaxiumParameters: {
          Business: {
            business_id: business.business_id,
            business_name: business.business_name,
            business_id_number: business.business_id_number,
            status_id: business.status_id,
            business_type_id: business.business_type_id,
            userIdInSession: userID,
            business_relationship: relationsID
          }
        }
      };
      return this.http.post(this.businessStoreApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseReaxium)
      .catch(this.handleErrorObservable);
  }

  /**
   * Llama al servicio para eliminar un business, que lo que hace es modificar su status = 3.
   * @param business
   * @param userID
   * @returns {Observable<R>}
   */
  deleteBusiness(business: Business, userID: string){
    var parameters = {
      ReaxiumParameters: {
        Business: {
          business_id: business.business_id,
          business_name: business.business_name,
          business_id_number: business.business_id_number,
          status_id: business.status_id,
          business_type_id: business.business_type_id,
          userIdInSession: userID
        }
      }
    };
    return this.http.post(this.businessDeleteApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseReaxium)
      .catch(this.handleErrorObservable);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in business service', error);
    return Promise.reject(error.message || error);
  }

  private handleErrorObservable(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);

  }
}
