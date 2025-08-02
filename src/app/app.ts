import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sales-date-prediction');

  constructor(private router: Router) { }

  navigateToD3Chart() {
    this.router.navigate(['/d3-chart']);
  }

  navigateToSalesDatePrediction() {
    this.router.navigate(['/sales-date-prediction']);
  }
}
