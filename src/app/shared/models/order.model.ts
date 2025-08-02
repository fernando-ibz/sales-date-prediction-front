import { Customer } from './customer.model';
import { Employee } from './employee.model';
import { Shipper } from './shipper.model';
import { OrderDetail } from './order-detail.model';

export interface Order {
  orderId: number;
  custId?: number;
  empId: number;
  orderDate: Date;
  requiredDate: Date;
  shippedDate?: Date;
  shipperId: number;
  freight: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion?: string;
  shipPostalCode?: string;
  shipCountry: string;

  customer?: Customer;
  employee?: Employee;
  shipper?: Shipper;
  orderDetails?: OrderDetail[];
}