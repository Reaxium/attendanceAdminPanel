/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {DataTableComponent} from "./datatable.component";
import {ColumnOptionComponent} from "./columnOption.component";
@Component({
  selector: 'datatable-column',
  template: "",
})
export class ColumnComponent {

  @Input() value: String;
  @Input() header: String;
  options: ColumnOptionComponent[];

  constructor(table: DataTableComponent) {
    table.addColumn(this);
  }

  addOption(option: ColumnOptionComponent) {
    this.options.push(option);
  }

}

