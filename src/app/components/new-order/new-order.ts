import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../services/order.service';

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
    MatNativeDateModule],
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
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string }
  ) {
    this.orderForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      orderDate: [new Date(), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    this.isSubmitting = true;
    const orderData = {
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
