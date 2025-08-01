export interface Customer {
  custid: number;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region?: string;
  postalcode?: string;
  country: string;
  phone: string;
  fax?: string;
}