import { BusinessType } from "./businessType";
import { BusinessStatus } from "./businessStatus";

export class Business {
  business_id: string;
  business_name: string;
  business_id_number: string;
  status_id: string;
  business_type_id: string;
  business_logo: string;
  business_type: BusinessType;
  status: BusinessStatus;
  address_id: string;
  check: boolean;

}

