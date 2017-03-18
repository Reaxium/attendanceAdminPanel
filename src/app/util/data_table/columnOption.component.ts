/**
 * Created by Eduardo Luttinger on 17/03/2017.
 */
/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {DataTableComponent} from "./datatable.component";
import {ColumnComponent} from "./column.component";
@Component({
  selector: 'datatable-option',
  template: "<img src='{{value}}'></img>",
})
export class ColumnOptionComponent {

  @Input() value: String;

  constructor(column: ColumnComponent) {
    column.addOption(this);
  }

}

