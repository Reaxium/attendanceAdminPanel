/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BusinessComponent} from "./business.component";
import { FormsModule } from '@angular/forms';
import {BusinessNameFilter} from "./business.pipe";

@NgModule({
  imports: [BrowserModule,FormsModule],
  declarations: [BusinessComponent,BusinessNameFilter],
  bootstrap: [BusinessComponent]
})

export class BusinessModule {
}
