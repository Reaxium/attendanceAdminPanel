/**
 * Created by Andreina Cuello on 4/24/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Device} from "./devices";
import {Observable} from 'rxjs/Observable';
import {ResponseWithPagination} from "../../../../commons/beans/responseWithPagination";
import {ResponseReaxium} from "../../../login/services/responseReaxium";

@Injectable()
export class DeviceService {
  private devices: Device;
  private devicesGetApiURL = "http://localhost/attendance_cloud/Device/allDeviceWithPagination";
  private devicesGetBusinessURL = "http://localhost/attendance_cloud/Business/allBusinessFiltered";
  private devicesGetBusinessRelatedURL = "http://localhost/attendance_cloud/Device/getBusinessRelationsWithADevice";
  private devicesStoreApiURL = "http://localhost/attendance_cloud/Device/createDeviceOrUpdate";
  private businessGetRelations = "http://localhost/attendance_cloud/Business/getBusinessRelations";
  private deviceDeleteApiURL = "http://localhost/attendance_cloud/Device/deleteDevice";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getDevicesSimulation(): Promise<Device[]> {
    return this.http.get("/app/data/devices.json").toPromise().then(res => res.json() as Device[]);
  }

  getDevicesObservable(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.devicesGetApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  getAllBusinessByType(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.devicesGetBusinessURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  getBusinessRelatedToDevice(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.devicesGetBusinessRelatedURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  storeOrEditDevices(device: Device, userID: string, relationsID: string[]){
    var parameters = {
      ReaxiumParameters: {
        ReaxiumDevice: {
          device_id: device.device_id,
          device_name: device.device_name,
          device_serial: device.device_serial,
          userIdInSession: userID,
          device_relations:relationsID
        }
      }

    };
    return this.http.post(this.devicesStoreApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseReaxium)
      .catch(this.handleErrorObservable);
  }

  getBusinessAndRelations(parameters: any): Observable<ResponseWithPagination> {
    return this.http.post(this.businessGetRelations, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseWithPagination)
      .catch(this.handleErrorObservable);
  }

  deleteDevice(device: Device, userID: string){
    var parameters = {
      ReaxiumParameters: {
        ReaxiumDevice: {
          device_id: device.device_id,
          userIdInSession: userID
        }
      }
    };
    return this.http.post(this.deviceDeleteApiURL, JSON.stringify(parameters), this.headers)
      .map(response => response.json() as ResponseReaxium)
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);

  }

}
