import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';
import { CommonHttpService } from './common-http.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public commonHttpService = inject(CommonHttpService)

  customers: WritableSignal<Customer[]> = signal([]);

  getCustomers(): Observable<Customer[]> {
    return this.commonHttpService.get<Customer[]>(
      environment.apiBaseUrl,
      `Customers`);
  }
}