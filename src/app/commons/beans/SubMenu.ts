/**
 * Created by VladimirIlich on 20/3/2017.
 */

import {ItemSubMenu} from './ItemListSubMenu';

export class SubMenu{
  sub_menu_id:number;
  name:string;
  url:string;
  menu_id:number;
  order_menu:number;
  itemList:ItemSubMenu[];
}
