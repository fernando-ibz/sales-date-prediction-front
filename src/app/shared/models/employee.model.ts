export interface Employee {
     empId: number;
     lastName: string;
     firstName: string;
     title: string;
     titleOfCourtesy: string;
     birthDate: Date;
     hireDate: Date;
     address: string;
     city: string;
     region?: string;
     postalCode?: string;
     country: string;
     phone: string;
     mgrId?: number;
     manager?: Employee;
}