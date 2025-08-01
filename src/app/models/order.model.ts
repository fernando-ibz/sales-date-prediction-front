import { Customer } from './customer.model';
import { Employee } from './employee.model';
import { Shipper } from './shipper.model';
import { OrderDetail } from './order-detail.model';

export interface Order {
  orderid: number;
  custid?: number;
  empid: number;
  orderdate: Date;
  requireddate: Date;
  shippeddate?: Date;
  shipperid: number;
  freight: number;
  shipname: string;
  shipaddress: string;
  shipcity: string;
  shipregion?: string;
  shippostalcode?: string;
  shipcountry: string;

  customer?: Customer;
  employee?: Employee;
  shipper?: Shipper;
  orderDetails?: OrderDetail[];
}