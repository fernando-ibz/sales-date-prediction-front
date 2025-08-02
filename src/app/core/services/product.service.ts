import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { CommonHttpService } from './common-http.service';

@Injectable({
     providedIn: 'root'
})
export class ProductService {
     public commonHttpService = inject(CommonHttpService)

     products: WritableSignal<Product[]> = signal([]);

     getProducts(): Observable<Product[]> {
          return this.commonHttpService.get<Product[]>(
               'apiBaseUrl',
               `Products`);
     }
}