/**
 * Created by Andreina on 3/15/2017.
 */
import { RouterModule, Routes } from "@angular/router";
import { EditBusinessComponent } from "./edit-business/editBusiness.component";
import { TableBusinessComponent } from "./table-business/tableBusiness.component";

export const BUSINESS_ROUTES: Routes = [
  { path: 'table', component: TableBusinessComponent},
  { path: 'table/newBusiness',component: EditBusinessComponent}
];
