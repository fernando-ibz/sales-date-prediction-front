import { Supplier } from './supplier.model';
import { Category } from './category.model';

export interface Product {
     productid: number;
     productname: string;
     supplierid: number;
     categoryid: number;
     unitprice: number;
     discontinued: boolean;
     supplier?: Supplier;
     category?: Category;
}