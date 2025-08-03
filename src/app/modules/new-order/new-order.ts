import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../core/services/employee.service';
import { MessagesService } from '../../core/services/messages.service';
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
  private _dialogRef = inject(DialogRef);
  private _messageService = inject(MessagesService);


  public employees: Employee[] = [];
  public shippers: Shipper[] = [];
  public products: Product[] = [];

  orderForm: FormGroup;
  orderDetailForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string, customerName: string }
  ) {
    this.orderForm = this.fb.group({
      custId: [data.customerId, [Validators.required]],
      empId: [null, [Validators.required]],
      orderDate: [new Date(), [Validators.required]],
      requiredDate: [new Date(), [Validators.required]],
      shippedDate: [new Date(), [Validators.required]],
      shipperId: [null, [Validators.required]],
      freight: [0, [Validators.required, Validators.min(0)]],
      shipName: ['', [Validators.required, Validators.maxLength(40)]],
      shipAddress: ['', [Validators.required, Validators.maxLength(60)]],
      shipCity: ['', [Validators.required, Validators.maxLength(15)]],
      shipRegion: [''],
      shipPostalCode: ['', [Validators.maxLength(10)]],
      shipCountry: ['', [Validators.required, Validators.maxLength(15)]]
    });

    this.orderDetailForm = this.fb.group({
      productId: [null, [Validators.required]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      qty: [0, [Validators.required]],
      discount: [0]
    });
  }
  ngOnInit(): void {
    this.getEmployees();
    this.getShippers();
    this.getProducts();
  }

  getEmployees() {
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
    if (this.orderDetailForm.invalid) return;

    this.isSubmitting = true;

    const orderData: Order = {
      ...this.orderForm.value,
      orderDetail: {
        ...this.orderDetailForm.value
      }
    };

    this._orderService.createOrder(orderData).subscribe(
      response => {
        if (response) {
          this._dialogRef.close(true);
          this._messageService.information("Order created sucessfully", "Close");
        }
      }
    );
  }
}
