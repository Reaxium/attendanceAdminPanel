/**
 * Created by VladimirIlich on 17/3/2017.
 */

import {Status} from './Status';
import {UserType} from './UserType';
import {Menu} from './Menu';
import {Business} from "../../modules/attendance/modules/business/business";


export class UserInfoAccess{
  user : UserInfoAccessBody;
}

export class UserInfoAccessBody{

  user_id: number;
  document_id: string;
  first_name: string;
  second_name: string;
  first_last_name:string;
  second_last_name:string;
  status_id:number;
  user_type_id:number;
  user_photo:string;
  business_id:number;
  email:string;
  birthdate:string;
  business_master_id:number;
  status:Status;
  busines:Business;
  user_type:UserType;
  stakeholders:any[];
  menu: Menu[];
}
