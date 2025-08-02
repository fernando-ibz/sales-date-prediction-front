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
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderDetail } from '../../shared/models/order-detail.model';
import { Order } from '../../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [];
  private lastOrderId = 0;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
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
        this.mockOrders.push({
          orderid: Math.floor(Math.random() * 50) + 1,
          custid: i,
          empid: Math.floor(Math.random() * 10) + 1,
          orderdate: orderDate,
          requireddate: requiredDate,
          shippeddate: shippedDate,
          shipperid: Math.floor(Math.random() * 3) + 1,
          freight: parseFloat((Math.random() * 100).toFixed(2)),
          shipname: `Customer ${i}`,
          shipaddress: `${Math.floor(Math.random() * 1000) + 1} Main St`,
          shipcity: ['New York', 'London', 'Berlin', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 5)],
          shipregion: ['NY', 'LN', 'BE', 'TK', 'SY'][Math.floor(Math.random() * 5)],
          shippostalcode: Math.floor((Math.random() * 90000) + 10000).toString(),
          shipcountry: ['USA', 'UK', 'Germany', 'Japan', 'Australia'][Math.floor(Math.random() * 5)],
          orderDetails: this.generateOrderDetails(i)
        });
      }
    }

    this.lastOrderId = 100;
  }

  private generateOrderDetails(orderId: number): OrderDetail[] {
    const detailCount = Math.floor(Math.random() * 5) + 1; // 1-5 items per order
    const details: OrderDetail[] = [];

    for (let i = 1; i <= detailCount; i++) {
      details.push({
        orderid: orderId,
        productid: Math.floor(Math.random() * 50) + 1,
        unitprice: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        qty: Math.floor(Math.random() * 10) + 1,
        discount: parseFloat((Math.random() * 0.3).toFixed(3)) // 0-0.3 discount
      });
    }

    return details;
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(300));
  }

  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.mockOrders.find(o => o.orderid === id);
    return of(order).pipe(delay(300));
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    const orders = this.mockOrders.filter(order => order.custid === customerId);
    return of(orders).pipe(delay(300));
  }

  getOrdersByEmployee(employeeId: number): Observable<Order[]> {
    const orders = this.mockOrders.filter(order => order.empid === employeeId);
    return of(orders).pipe(delay(300));
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    const newOrder: Order = {
      orderid: ++this.lastOrderId,
      custid: order.custid || 0,
      empid: order.empid || 1,
      orderdate: order.orderdate || new Date(),
      requireddate: order.requireddate || new Date(),
      shippeddate: order.shippeddate,
      shipperid: order.shipperid || 1,
      freight: order.freight || 0,
      shipname: order.shipname || 'New Order',
      shipaddress: order.shipaddress || '123 Main St',
      shipcity: order.shipcity || 'New York',
      shipregion: order.shipregion,
      shippostalcode: order.shippostalcode || '10001',
      shipcountry: order.shipcountry || 'USA',
      orderDetails: order.orderDetails || []
    };

    this.mockOrders.push(newOrder);
    return of(newOrder).pipe(delay(300));
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    const index = this.mockOrders.findIndex(o => o.orderid === id);
    if (index >= 0) {
      this.mockOrders[index] = { ...this.mockOrders[index], ...order };
      return of(this.mockOrders[index]).pipe(delay(300));
    }
    throw new Error('Order not found');
  }

  deleteOrder(id: number): Observable<void> {
    this.mockOrders = this.mockOrders.filter(o => o.orderid !== id);
    return of(undefined).pipe(delay(300));
  }

  getRecentOrders(count: number = 5): Observable<Order[]> {
    const sorted = [...this.mockOrders].sort((a, b) =>
      b.orderdate.getTime() - a.orderdate.getTime());
    return of(sorted.slice(0, count)).pipe(delay(300));
  }
}