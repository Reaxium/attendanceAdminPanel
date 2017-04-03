/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, Input,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginUserService} from "../services/login.service";
import {ResponseReaxium} from "../services/responseReaxium";
import {Spinner} from "../../../util/spinner_loading/spinner.component";
import {onSpinnerListener} from '../../../util/spinner_loading/onSpinnerListener';
import {Message} from 'primeng/primeng';
import {Constants} from '../../../commons/global/global.constants';

@Component({
  selector: 'my-login',
  templateUrl: "./app/modules/login/component/login.component.html",
  styleUrls: ["app/modules/login/component/login.component.css"],
  providers: [LoginUserService]
})
export class LoginComponent implements OnInit, onSpinnerListener{

  loading:boolean = false;

  //access: Access;
  userLoginName: string = '';
  userPassword: string = '';
  response: ResponseReaxium;
  msgs : Message[] = [];
  spinner:any;
  checked: boolean = false;

  constructor(private service: LoginUserService, private router: Router) {
    this.spinner = new Spinner();
  }

  ngOnInit(): void {
    if(localStorage.getItem("rememberPass") == undefined){
       localStorage.setItem("rememberPass","false");
       localStorage.setItem("userName","");
       localStorage.setItem("passUser","");

    }else{
      this.checked = (localStorage.getItem("rememberPass") == "true") ? true : false;
      this.userLoginName = localStorage.getItem("userName");
      this.userPassword = localStorage.getItem("passUser");
    }
  }


  validateLogin(): void {
    this.showSpinner();

    let checkedStatus : string = this.checked == true ? "true":"false";
    localStorage.setItem("rememberPass",checkedStatus);
    localStorage.setItem("userName",this.userLoginName);
    localStorage.setItem("passUser",this.userPassword);

    let request = {
      ReaxiumParameters: {
        Access: {
          user_login_name: this.userLoginName,
          user_password: this.userPassword
        }
      }
    };
    //test local storage
    this.service.getAccessUsers(request)
      .then(ResponseReaxium => this.getHandlerResponse(ResponseReaxium),
                 error=>this.errorMessage(<any>error));
  }

  getHandlerResponse(response:ResponseReaxium): void {
    this.hideSpinner();
    if(response.ReaxiumResponse.code == Constants.SUCCESSFUL_RESPONSE_CODE){

      let responseHanlder = response.ReaxiumResponse.object[0].user;
      console.log(JSON.stringify(responseHanlder));

      let userInfo = {
        userId: responseHanlder.user_id,
        documentId: responseHanlder.document_id,
        firstName: responseHanlder.first_name,
        firstLastName: responseHanlder.first_last_name,
        statusId:responseHanlder.status_id,
        userPhoto:responseHanlder.user_photo,
        email:responseHanlder.email,
        businessId:responseHanlder.busines.business_id,
        businessName:responseHanlder.busines.business_name,
        businessLogo:responseHanlder.busines.business_logo,
        businessTypeId:responseHanlder.busines.business_type_id,
        userTypeId:responseHanlder.user_type.user_type_id,
        userTypeName:responseHanlder.user_type.user_type_name
      };
      sessionStorage.getItem('userInformation');
      sessionStorage.setItem("userInformation",JSON.stringify(userInfo));
      sessionStorage.setItem("menu",JSON.stringify(responseHanlder.menu));
      this.router.navigate(['/attendance/dashboard']);

    }else{
      console.log("Error servicio: "+ response.ReaxiumResponse.message);
     this.msgs.push({
       severity:'warn',
       summary:'Invalidated User',
       detail:'Validation failed'
     });
    }

  }

  private errorMessage(error:any): void {
    this.hideSpinner();
    console.log(JSON.stringify(error));
    this.msgs.push({
      severity:'error',
      summary:'Error',
      detail:'Error invoked services...'
    });
  }

  showSpinner(): void {this.loading = true;}

  hideSpinner(): void {this.loading = false;}
}

