import { Product } from './product.model';
import { Order } from './order.model';

export interface OrderDetail {
     orderId: number;
     productId: number;
     unitPrice: number;
     qty: number;
     discount: number;

     product?: Product;
     order?: Order;
}