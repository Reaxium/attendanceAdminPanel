/**
 * Created by VladimirIlich on 17/3/2017.
 */
import {} from './BusinessType';
import {BusinessType} from "./BusinessType";

export class Business{

  business_id:number;
  business_name:string;
  business_id_number:number;
  status_id:number;
  business_type_id:number;
  business_logo:string;
  business_type: BusinessType;
}
