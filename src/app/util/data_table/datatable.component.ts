/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {ColumnComponent} from "./column.component";
@Component({
  selector: 't4ss-data-table',
  templateUrl: "./app/util/data_table/datatable.component.html",
})
export class DataTableComponent {

  @Input() dataSet: any[];
  columns: ColumnComponent[] = [];

  addColumn(column: any): void {
    this.columns.push(column);
  }
}
