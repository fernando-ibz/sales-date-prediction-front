import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-view',
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.scss'
})
export class OrdersView {
  displayedColumns: string[] = ['orderDate', 'productName', 'quantity', 'unitPrice', 'total'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);

  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number },
    private orderService: OrderService
  ) {
    this.loadOrders(data.customerId);
  }

  loadOrders(customerId: number): void {
    this.orderService.getOrdersByCustomer(customerId).subscribe({
      next: (orders) => {
        this.dataSource = new MatTableDataSource(orders);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.isLoading = false;
      }
    });
  }

  calculateTotal(order: Order): number {
    return 11 * 2;
  }
}
