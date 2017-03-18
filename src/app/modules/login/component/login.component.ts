/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LoginUserService} from "../services/login.service";
import {ResponseReaxium} from "../objects/ResponseReaxium";


@Component({
  selector: 'my-login',
  templateUrl: "./app/modules/login/component/login.component.html",
  styleUrls: ["app/modules/login/component/login.component.css"],
  providers: [LoginUserService]
})
export class LoginComponent {

  //access: Access;
  userLoginName: string = '';
  userPassword: string = '';
  response: ResponseReaxium;

  constructor(private service: LoginUserService, private router: Router) {}

  validateLogin(): void {

    let request = {
      ReaxiumParameters: {
        Access: {
          user_login_name: this.userLoginName,
          user_password: this.userPassword
        }
      }
    };

    this.service.getAccessUsers(request)
      .subscribe(ResponseReaxium => this.getHandlerResponse(ResponseReaxium),
                 error=>this.errorMessage(<any>error));
  }

  getHandlerResponse(response:ResponseReaxium): void {
    if(response.code == 0){
      console.log(JSON.stringify(response));
    }else{
      console.log("Error servicio: "+ response.message);
    }

  }

  private errorMessage(error:any): void {
    console.log(JSON.stringify(error));
  }

}

