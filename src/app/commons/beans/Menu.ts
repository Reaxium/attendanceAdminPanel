/**
 * Created by VladimirIlich on 20/3/2017.
 */
import {SubMenu} from './SubMenu';

export class Menu{

  menu_id:number;
  class_menu:number;
  name_menu:string;
  business_master_id:number;
  description:string;
  order_menu:number;
  sub_menu_application:SubMenu[];
}
