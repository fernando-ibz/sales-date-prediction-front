export interface Employee {
     empid: number;
     lastname: string;
     firstname: string;
     title: string;
     titleofcourtesy: string;
     birthdate: Date;
     hiredate: Date;
     address: string;
     city: string;
     region?: string;
     postalcode?: string;
     country: string;
     phone: string;
     mgrid?: number;
     manager?: Employee;
}