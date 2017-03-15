/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: "./app/component/app.component.html",
  styleUrls: ["app/component/app.component.css"]
})
export class AppComponent {

  constructor(private router: Router) {
  }

}
