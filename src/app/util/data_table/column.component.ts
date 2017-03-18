/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {DataTableComponent} from "./datatable.component";
import {DataTableOption} from "./option";
import {onDataTableListener} from "./onDataTableListener";
@Component({
  selector: 'datatable-column',
  template: "",
})
export class ColumnComponent {

  @Input() value: String;
  @Input() header: String;
  @Input() dataColumn: Boolean;
  @Input() actionColumn: Boolean;
  @Input() options: DataTableOption[];

  constructor(table: DataTableComponent) {
    table.addColumn(this);
  }

}

