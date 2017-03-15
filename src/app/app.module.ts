import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent}  from './modules/login/component/login.component';
import {AppComponent} from './component/app.component';
import {Routes, RouterModule} from "@angular/router";
import {LoginModule} from "./modules/login/login.module";
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
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), LoginModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
