/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {BusinessComponent} from "./business.component";
import { FormsModule } from '@angular/forms';
import {BusinessNameFilter} from "./business.pipe";
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [BrowserModule,FormsModule,MaterialModule],
  declarations: [BusinessComponent,BusinessNameFilter],
  bootstrap: [BusinessComponent]
})

export class BusinessModule {
}
