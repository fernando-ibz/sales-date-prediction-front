import { Product } from './product.model';
import { Order } from './order.model';

export interface OrderDetail {
     orderid: number;
     productid: number;
     unitprice: number;
     qty: number;
     discount: number;

     product?: Product;
     order?: Order;
}