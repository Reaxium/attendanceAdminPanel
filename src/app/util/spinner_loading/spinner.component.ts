/**
 * Created by VladimirIlich on 20/3/2017.
 */
import {Component,Input} from '@angular/core';
import {onSpinnerListener} from './onSpinnerListener';

@Component({
  selector:'my-spinner',
  template:
    `<div class="overlay" *ngIf="loading">
        <div class="centrar">
          <img src="../../../assets/img/loading.gif" class="spinner_img">
        </div>
      </div>`,
  styleUrls:['app/util/spinner_loading/spinner.component.css'],
})
export class Spinner{

  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  @Input()loading : boolean = false;

  constructor(){}

}
