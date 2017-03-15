/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent]
})

export class DashboardModule {
}
