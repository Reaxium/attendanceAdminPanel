/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */

import {Component, OnInit, Input} from '@angular/core';
import { BusinessService } from "./business.service";
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'business-component',
  templateUrl: "./app/modules/attendance/modules/business/business.component.html",
  styleUrls: ["app/modules/attendance/modules/business/business.component.css"],
  providers: [BusinessService]
})

export class BusinessComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['attendance/business/table']);
  }

}
