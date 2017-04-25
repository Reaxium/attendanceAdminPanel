/**
 * Created by Eduardo Luttinger on 18/03/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Device} from "./devices";

@Injectable()
export class DeviceService {

  constructor(private http: Http) {
  }

  getDevicesSimulation(): Promise<Device[]> {
    return this.http.get("/app/data/devices.json").toPromise().then(res => res.json() as Device[]);
  }

}/**
 * Created by eduardo on 4/24/2017.
 */
