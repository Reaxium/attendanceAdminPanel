/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {ColumnComponent} from "./column.component";
import {onDataTableListener} from "./onDataTableListener";
import {DataTableOption} from "./option";

@Component({
  selector: 't4ss-data-table',
  templateUrl: "./app/util/data_table/datatable.component.html",
})
export class DataTableComponent{

  @Input() dataSet: any[];
  @Input() enableFilter = false;
  @Input() listener: onDataTableListener;
  @Input() enablePagination = false;
  @Input() actualPage = 1;
  @Input() totalItems = 0;
  @Input() dataPerPage = 3;
  columns: ColumnComponent[] = [];
  query: string;



  addColumn(column: any): void {
    this.columns.push(column);
  }

  filter(): void {
    this.listener.onDataTableSearch(this.query);
  }

  sortByColumn(columnName: String): void {
    this.listener.onSortByColumn(columnName);
  }

  getPage(page: number) {
    this.listener.onPageChange(page);
  }

  optionSelected(option: DataTableOption, dataObject: any): void {
    this.listener.onOptionSelected(option,dataObject);
  }

  selectedOptionType(option: any,type: string): boolean {
    if(option.type==type){
      return true;
    }
    return false;
  }

  /*checkbox2(objects: any): void{
    console.log('objects=', objects);
  }

  checkbox(objects: any[]):void{
    this.display = !this.display;
    if(this.display){
    console.log('objects=', objects);
    this.listener.onObjects(objects);
    }
  }*/

}
