/**
 * Created by VladimirIlich on 20/3/2017.
 */

import {UserInfoAccess} from '../../../commons/beans/UserInfoAccess';

export class ResponseReaxium{
  ReaxiumResponse:ReaxiumResponseBody;
}

export class ReaxiumResponseBody{
  code : number;
  message: string;
  object: UserInfoAccess[];
}

