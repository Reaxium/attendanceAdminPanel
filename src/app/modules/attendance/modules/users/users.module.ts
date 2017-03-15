/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {UsersComponent} from "./users.component";


@NgModule({
  imports: [BrowserModule],
  declarations: [UsersComponent],
  bootstrap: [UsersComponent]
})

export class UsersModule {

}
