import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpService } from './common-http.service';
import { Order } from '../../shared/models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public commonHttpService = inject(CommonHttpService)

  orders: WritableSignal<Order[]> = signal([]);

  getByCustomerId(customeId: number): Observable<Order[]> {
    return this.commonHttpService.get<Order[]>(
      environment.apiBaseUrl,
      `Orders/CustomerId/${customeId}`);
  }

  createOrder(order: Order) {
    return this.commonHttpService.post(
      environment.apiBaseUrl,
      `Orders`,
      order);
  }
}