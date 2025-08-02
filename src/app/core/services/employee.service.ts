import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { CommonHttpService } from './common-http.service';

@Injectable({
     providedIn: 'root'
})
export class EmployeeService {
     public commonHttpService = inject(CommonHttpService)

     employees: WritableSignal<Employee[]> = signal([]);

     getEmployees(): Observable<Employee[]> {
          return this.commonHttpService.get<Employee[]>(
               'apiBaseUrl',
               `Employees`);
     }
}