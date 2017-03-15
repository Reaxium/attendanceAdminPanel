/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {DevicesComponent} from "./devices.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [DevicesComponent],
  bootstrap: [DevicesComponent]
})

export class DevicesModule {

}
