import { BusinessType } from "./businessType";
import { BusinessStatus } from "./businessStatus";

export class Business {
  business_id: number;
  business_name: string;
  business_id_number: number;
  status_id: number;
  business_type_id: number;
  business_logo: string;
  business_type: BusinessType;
  status: BusinessStatus;

}

