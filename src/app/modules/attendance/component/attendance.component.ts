/**
 * Created by Eduardo Luttinger on 15/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'attendance',
  templateUrl: "./app/modules/attendance/component/attendance.component.html",
  styleUrls: ["app/modules/attendance/component/attendance.component.css"]
})
export class AttendanceComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['/attendance/dashboard']);
  }

}


