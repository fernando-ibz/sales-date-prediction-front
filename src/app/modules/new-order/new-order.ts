import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order.model';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

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
export class NewOrder {
  orderForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
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

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    this.isSubmitting = true;
    const orderData: Order = {
      customerId: this.data.customerId,
      ...this.orderForm.value
    };

    this.orderService.createOrder(orderData).subscribe({
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
