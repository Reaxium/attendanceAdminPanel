/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {DataTableComponent} from "./datatable.component";
@Component({
  selector: 'datatable-column',
  template: "",
})
export class ColumnComponent {

  @Input() value: String;
  @Input() header: String;

  constructor(table: DataTableComponent) {
    table.addColumn(this);
  }

}

