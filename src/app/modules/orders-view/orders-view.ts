import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.scss'
})
export class OrdersView implements OnInit, AfterViewInit {
  private _orderService = inject(OrderService)

  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  isLoading = true;

  modalData!: { customerId: number, customerName: string }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number, customerName: string }
  ) {
    this.modalData = data;
  }

  ngOnInit(): void {
    this.loadOrders(this.modalData.customerId);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders(customerId: number): void {
    this._orderService.getByCustomerId(customerId).subscribe(
      response => {
        if (response) {
          this._orderService.orders.set(response);
          this.dataSource = new MatTableDataSource(this._orderService.orders());
          this.dataSource.paginator = this.paginator;
          setTimeout(() => {
            this.dataSource.sort = this.sort;
          });
          this.isLoading = false;
        }
      }
    );
  }
}
