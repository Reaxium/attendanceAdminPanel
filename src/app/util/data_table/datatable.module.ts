/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Ng2PaginationModule} from "ng2-pagination";
import {DataTableComponent} from "./datatable.component";
import {ColumnComponent} from "./column.component";
import {CommonModule} from "@angular/common";
@NgModule({
  imports: [CommonModule, FormsModule, Ng2PaginationModule],
  declarations: [DataTableComponent, ColumnComponent],
  exports:[DataTableComponent, ColumnComponent]
})
export class DataTableModule {}
