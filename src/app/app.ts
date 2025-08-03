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
  menuOpen = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigateToSalesDatePrediction(): void {
    this.router.navigate(['/sales-prediction']);
  }

  navigateToD3Chart(): void {
    this.router.navigate(['/d3-chart']);
  }
}
