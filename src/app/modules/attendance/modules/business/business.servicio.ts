import { Injectable } from '@angular/core';
import { Business } from './business';

@Injectable()
export class BusinessServicio {
  business: Business[]=[
    new Business('West ',
      '2045',
      'school'
    ),
    new Business('UCV ',
      '2033',
      'master'
    ),
    new Business('Reaxium ',
      '2067',
      'school'
    )
    ];

  constructor() { }

  getBusiness(): Promise<Business[]>{
    return Promise.resolve(this.business);
  }




}/**
 * Created by eduardo on 3/16/2017.
 */
