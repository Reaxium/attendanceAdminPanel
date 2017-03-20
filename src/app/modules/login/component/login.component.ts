/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LoginUserService} from "../services/login.service";
import {ResponseReaxium} from "../../../commons/beans/ResponseReaxium";
import {Spinner} from "../../../util/spinner_loading/spinner.component";
import {onSpinnerListener} from '../../../util/spinner_loading/onSpinnerListener';

@Component({
  selector: 'my-login',
  templateUrl: "./app/modules/login/component/login.component.html",
  styleUrls: ["app/modules/login/component/login.component.css"],
  providers: [LoginUserService]
})
export class LoginComponent implements onSpinnerListener{

  loading:boolean = false;

  //access: Access;
  userLoginName: string = '';
  userPassword: string = '';
  response: ResponseReaxium;
  alerts:any = [];
  spinner:any;

  constructor(private service: LoginUserService, private router: Router) {
    this.spinner = new Spinner();
  }

  validateLogin(): void {
    this.showSpinner();
    let request = {
      ReaxiumParameters: {
        Access: {
          user_login_name: this.userLoginName,
          user_password: this.userPassword
        }
      }
    };

    this.service.getAccessUsers(request)
      .then(ResponseReaxium => this.getHandlerResponse(ResponseReaxium),
                 error=>this.errorMessage(<any>error));
  }

  getHandlerResponse(response:ResponseReaxium): void {
    this.hideSpinner();
    console.log(JSON.stringify(response));
    if(response.code == 0){
      console.log(JSON.stringify(response));
    }else{
      console.log("Error servicio: "+ response.message);
      this.alerts.push({
        type:'danger',
        msg:'Invalid user',
        timeout: 5000
      });
    }

  }

  private errorMessage(error:any): void {
    this.hideSpinner();
    console.log(JSON.stringify(error));
  }

  showSpinner(): void {this.loading = true;}

  hideSpinner(): void {this.loading = false;}
}

