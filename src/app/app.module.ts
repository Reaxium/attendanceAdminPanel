import {NgModule}  from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent}  from './modules/login/component/login.component';
import {AppComponent} from './component/app.component';
import {Routes, RouterModule} from "@angular/router";
import {LoginModule} from "./modules/login/login.module";
import { MaterialModule } from '@angular/material';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), LoginModule, MaterialModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
