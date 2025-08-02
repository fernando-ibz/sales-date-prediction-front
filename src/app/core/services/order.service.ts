// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Order } from '../models/order.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private apiUrl = 'api/orders';

//   constructor(private http: HttpClient) {}

//   getOrdersByCustomer(customerId: string): Observable<Order[]> {
//     return this.http.get<Order[]>(`${this.apiUrl}?customerId=${customerId}`);
//   }

//   createOrder(order: Partial<Order>): Observable<Order> {
//     return this.http.post<Order>(this.apiUrl, order);
//   }
// }
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderDetail } from '../../shared/models/order-detail.model';
import { Order } from '../../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private lastorderId = 0;
  orders: WritableSignal<Order[]> = signal([]);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    let mockOrders: Order[] = [];

    for (let i = 1; i <= 15; i++) {
      const orderDate = this.randomDate(new Date(2022, 0, 1), new Date());
      const requiredDate = new Date(orderDate);

      requiredDate.setDate(requiredDate.getDate() + Math.floor(Math.random() * 30) + 7);

      const shippedDate = Math.random() > 0.2
        ? new Date(orderDate)
        : undefined;

      if (shippedDate) {
        shippedDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 10) + 1);
      }

      let ordersQuantity = Math.floor(Math.random() * 20) + 1

      for (let o = 1; o <= ordersQuantity; o++) {
        mockOrders.push({
          orderId: Math.floor(Math.random() * 50) + 1,
          custId: i,
          empId: Math.floor(Math.random() * 10) + 1,
          orderDate: orderDate,
          requiredDate: requiredDate,
          shippedDate: shippedDate,
          shipperId: Math.floor(Math.random() * 3) + 1,
          freight: parseFloat((Math.random() * 100).toFixed(2)),
          shipName: `Customer ${i}`,
          shipAddress: `${Math.floor(Math.random() * 1000) + 1} Main St`,
          shipCity: ['New York', 'London', 'Berlin', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 5)],
          shipRegion: ['NY', 'LN', 'BE', 'TK', 'SY'][Math.floor(Math.random() * 5)],
          shipPostalCode: Math.floor((Math.random() * 90000) + 10000).toString(),
          shipCountry: ['USA', 'UK', 'Germany', 'Japan', 'Australia'][Math.floor(Math.random() * 5)],
          orderDetails: this.generateOrderDetails(i)
        });
      }

    }

    this.orders.set(mockOrders);
    this.lastorderId = 100;
  }

  private generateOrderDetails(orderId: number): OrderDetail[] {
    const detailCount = Math.floor(Math.random() * 5) + 1;
    const details: OrderDetail[] = [];

    for (let i = 1; i <= detailCount; i++) {
      details.push({
        orderId: orderId,
        productId: Math.floor(Math.random() * 50) + 1,
        unitPrice: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        qty: Math.floor(Math.random() * 10) + 1,
        discount: parseFloat((Math.random() * 0.3).toFixed(3))
      });
    }

    return details;
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders()).pipe(delay(300));
  }

  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.orders().find(o => o.orderId === id);
    return of(order).pipe(delay(300));
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    const orders = this.orders().filter(order => order.custId === customerId);
    return of(orders).pipe(delay(300));
  }

  getOrdersByEmployee(employeeId: number): Observable<Order[]> {
    const orders = this.orders().filter(order => order.empId === employeeId);
    return of(orders).pipe(delay(300));
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    const newOrder: Order = {
      orderId: ++this.lastorderId,
      custId: order.custId || 0,
      empId: order.empId || 1,
      orderDate: order.orderDate || new Date(),
      requiredDate: order.requiredDate || new Date(),
      shippedDate: order.shippedDate,
      shipperId: order.shipperId || 1,
      freight: order.freight || 0,
      shipName: order.shipName || 'New Order',
      shipAddress: order.shipAddress || '123 Main St',
      shipCity: order.shipCity || 'New York',
      shipRegion: order.shipRegion,
      shipPostalCode: order.shipPostalCode || '10001',
      shipCountry: order.shipCountry || 'USA',
      orderDetails: order.orderDetails || []
    };

    this.orders().push(newOrder);
    return of(newOrder).pipe(delay(300));
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    const index = this.orders().findIndex(o => o.orderId === id);
    if (index >= 0) {
      this.orders()[index] = { ...this.orders()[index], ...order };
      return of(this.orders()[index]).pipe(delay(300));
    }
    throw new Error('Order not found');
  }

  deleteOrder(id: number): Observable<void> {
    this.orders.set(this.orders().filter(o => o.orderId !== id));
    return of(undefined).pipe(delay(300));
  }

  getRecentOrders(count: number = 5): Observable<Order[]> {
    const sorted = [...this.orders()].sort((a, b) =>
      b.orderDate.getTime() - a.orderDate.getTime());
    return of(sorted.slice(0, count)).pipe(delay(300));
  }
}