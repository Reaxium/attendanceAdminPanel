import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Business} from './business';

@Pipe({
  name: 'businessNameFilter'
})
@Injectable()
export class BusinessNameFilter implements PipeTransform {
  transform(business: Business[], args: any[]): any {
    return business.filter(business => business.name.toLowerCase().indexOf(args[0]) !== -1);
  }
}/**
 * Created by eduardo on 3/16/2017.
 */
