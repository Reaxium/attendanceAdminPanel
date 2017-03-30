/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Users} from "../../../commons/beans/users";

@Component({
  selector: 'my-login',
  templateUrl: "./app/modules/login/component/login.component.html",
  styleUrls: ["app/modules/login/component/login.component.css"]
})
export class LoginComponent {

  name = 'Vladi1000';

  constructor(private router: Router) {
  }


  validateLogin(): void {
    this.router.navigate(['/app']);
  }

}

