import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from '../../core/services/customer.service';
import { NewOrder } from '../new-order/new-order';
import { OrdersView } from '../orders-view/orders-view';

@Component({
  selector: 'app-sales-prediction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './sales-prediction.html',
  styleUrls: ['./sales-prediction.scss']
})
export class SalesDatePrediction implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['companyName', 'contactName', 'phone', 'actions'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>([]);
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers(filter: string = ''): void {
    this.isLoading = true;
    this.customerService.getCustomers(filter).subscribe({
      next: (customers) => {
        this.dataSource = new MatTableDataSource(customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error loading customers', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue.length > 3)
      console.log(filterValue);
  }

  openOrdersView(customerId: number, customerName: string): void {
    this.dialog.open(OrdersView, {
      width: '60vw',
      maxWidth: 'none',
      data: { customerId, customerName }
    });
  }

  openNewOrder(customerId: number, customerName: string): void {
    const dialogRef = this.dialog.open(NewOrder, {
      width: '35vw',
      maxWidth: 'none',
      data: { customerId, customerName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomers();
      }
    });
  }
}