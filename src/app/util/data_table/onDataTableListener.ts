import {DataTableOption} from "./option";
/**
 * Created by Eduardo Luttinger on 16/03/2017.
 */
export interface onDataTableListener {
  onDataTableSearch(query: string): void;
  onSortByColumn(columnIdName: String): void;
  onPageChange(page: number): void;
  onOptionSelected(option:DataTableOption,dataObject: any):void;
  //onObjects(objects: any[]):void;
}
