/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Business} from "./business";
import { BusinessServicio } from "./business.servicio";
import {BusinessNameFilter} from "./business.pipe";

@Component({
  selector: 'business-component',
  templateUrl: "./app/modules/attendance/modules/business/business.component.html",
  styleUrls: ["app/modules/attendance/modules/business/business.component.css"],
  providers: [BusinessServicio]
})
export class BusinessComponent implements OnInit {
  business: Business[] = [];
  @Input() name: string = '';

  constructor(private businessService: BusinessServicio) { }

  getBusiness(): void {
    this.businessService.getBusiness().then(business => this.business = business);
  }
  ngOnInit(): void {
    this.getBusiness();
  }
}
