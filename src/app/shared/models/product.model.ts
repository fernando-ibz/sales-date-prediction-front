import { Supplier } from './supplier.model';
import { Category } from './category.model';

export interface Product {
     productId: number;
     productName: string;
     supplierId: number;
     categoryId: number;
     unitPrice: number;
     discontinued: boolean;
     supplier?: Supplier;
     category?: Category;
}