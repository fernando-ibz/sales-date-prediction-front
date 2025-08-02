import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../core/services/employee.service';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { ShipperService } from '../../core/services/shipper.service';
import { Employee } from '../../shared/models/employee.model';
import { Order } from '../../shared/models/order.model';
import { Product } from '../../shared/models/product.model';
import { Shipper } from '../../shared/models/shipper.model';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule
  ],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss'
})
export class NewOrder implements OnInit {
  private _employeeService = inject(EmployeeService);
  private _shipperService = inject(ShipperService);
  private _productService = inject(ProductService);
  private _orderService = inject(OrderService);

  public employees: Employee[] = [];
  public shippers: Shipper[] = [];
  public products: Product[] = [];

  orderForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrder>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string, customerName: string }
  ) {
    this.orderForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      orderDate: [new Date(), Validators.required]
      // employee?: Employee;
      // shipper?: Shipper;
      // shipName: string;
      // shipAddress: string;
      // shipCity: string;
      // shipCountry: string;
      // orderDate: Date;
      // requiredDate: Date;
      // shippedDate?: Date;
      // freight: number;

      // orderId: number;
      // custId?: number;
      // empId: number;
      // shipperId: number;
      // shipRegion?: string;
      // shipPostalCode?: string;

      // customer?: Customer;
      // orderDetails?: OrderDetail[];
    });
  }
  ngOnInit(): void {
    this.getEmployees();
    this.getShippers();
    this.getProducts();

    debugger
  }

  getEmployees() {
    if (this._employeeService.employees().length <= 0)
      this._employeeService.getEmployees().subscribe(
        response => {
          if (response) {
            this._employeeService.employees.set(response);
            this.employees = this._employeeService.employees();
          }
        }
      );
  }

  getShippers() {
    if (this._shipperService.shippers().length <= 0)
      this._shipperService.getShippers().subscribe(
        response => {
          if (response) {
            this._shipperService.shippers.set(response);
            this.shippers = this._shipperService.shippers();
          }
        }
      );
  }

  getProducts() {
    if (this._productService.products().length <= 0)
      this._productService.getProducts().subscribe(
        response => {
          if (response) {
            this._productService.products.set(response);
            this.products = this._productService.products();
          }
        }
      );
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    this.isSubmitting = true;
    const orderData: Order = {
      customerId: this.data.customerId,
      ...this.orderForm.value
    };

    this._orderService.createOrder(orderData).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error creating order', err);
        this.isSubmitting = false;
      }
    });
  }

  get f() {
    return this.orderForm.controls;
  }
}
