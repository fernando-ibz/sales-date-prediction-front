import { Routes } from '@angular/router';
import { SalesDatePrediction } from './modules/sales-prediction/sales-prediction';
import { D3Chart } from './modules/d3-chart/d3-chart';

export const routes: Routes = [
     { path: '', redirectTo: '/sales-date-prediction', pathMatch: 'full' },
     { path: 'sales-date-prediction', component: SalesDatePrediction },
     { path: 'd3-chart', component: D3Chart },
     { path: '**', redirectTo: '/sales-date-prediction' }
];
