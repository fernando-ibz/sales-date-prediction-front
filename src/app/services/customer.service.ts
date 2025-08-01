import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'api/customers';

  constructor(private http: HttpClient) { }

  private mockCustomers: Customer[] = [
    {
      custid: 1,
      companyname: 'Alfreds Futterkiste',
      contactname: 'Maria Anders',
      contacttitle: 'Sales Representative',
      address: 'Obere Str. 57',
      city: 'Berlin',
      region: 'Western Europe',
      postalcode: '12209',
      country: 'Germany',
      phone: '030-0074321',
      fax: '030-0076545'
    },
    {
      custid: 2,
      companyname: 'Ana Trujillo Emparedados y helados',
      contactname: 'Ana Trujillo',
      contacttitle: 'Owner',
      address: 'Avda. de la Constitución 2222',
      city: 'México D.F.',
      postalcode: '05021',
      country: 'Mexico',
      phone: '(5) 555-4729',
      fax: '(5) 555-3745'
    },
    {
      custid: 3,
      companyname: 'Antonio Moreno Taquería',
      contactname: 'Antonio Moreno',
      contacttitle: 'Owner',
      address: 'Mataderos  2312',
      city: 'México D.F.',
      postalcode: '05023',
      country: 'Mexico',
      phone: '(5) 555-3932'
    },
    {
      custid: 4,
      companyname: 'Around the Horn',
      contactname: 'Thomas Hardy',
      contacttitle: 'Sales Representative',
      address: '120 Hanover Sq.',
      city: 'London',
      postalcode: 'WA1 1DP',
      country: 'UK',
      phone: '(171) 555-7788',
      fax: '(171) 555-6750'
    },
    {
      custid: 5,
      companyname: 'Berglunds snabbköp',
      contactname: 'Christina Berglund',
      contacttitle: 'Order Administrator',
      address: 'Berguvsvägen  8',
      city: 'Luleå',
      postalcode: 'S-958 22',
      country: 'Sweden',
      phone: '0921-12 34 65',
      fax: '0921-12 34 67'
    },
    {
      custid: 6,
      companyname: 'Blauer See Delikatessen',
      contactname: 'Hanna Moos',
      contacttitle: 'Sales Representative',
      address: 'Forsterstr. 57',
      city: 'Mannheim',
      postalcode: '68306',
      country: 'Germany',
      phone: '0621-08460',
      fax: '0621-08924'
    },
    {
      custid: 7,
      companyname: 'Blondel père et fils',
      contactname: 'Frédérique Citeaux',
      contacttitle: 'Marketing Manager',
      address: '24, place Kléber',
      city: 'Strasbourg',
      postalcode: '67000',
      country: 'France',
      phone: '88.60.15.31',
      fax: '88.60.15.32'
    },
    {
      custid: 8,
      companyname: 'Bólido Comidas preparadas',
      contactname: 'Martín Sommer',
      contacttitle: 'Owner',
      address: 'C/ Araquil, 67',
      city: 'Madrid',
      postalcode: '28023',
      country: 'Spain',
      phone: '(91) 555 22 82',
      fax: '(91) 555 91 99'
    },
    {
      custid: 9,
      companyname: 'Bon app\'',
      contactname: 'Laurence Lebihan',
      contacttitle: 'Owner',
      address: '12, rue des Bouchers',
      city: 'Marseille',
      postalcode: '13008',
      country: 'France',
      phone: '91.24.45.40',
      fax: '91.24.45.41'
    },
    {
      custid: 10,
      companyname: 'Bottom-Dollar Markets',
      contactname: 'Elizabeth Lincoln',
      contacttitle: 'Accounting Manager',
      address: '23 Tsawassen Blvd.',
      city: 'Tsawassen',
      region: 'BC',
      postalcode: 'T2F 8M4',
      country: 'Canada',
      phone: '(604) 555-4729',
      fax: '(604) 555-3745'
    },
    {
      custid: 11,
      companyname: 'B\'s Beverages',
      contactname: 'Victoria Ashworth',
      contacttitle: 'Sales Representative',
      address: 'Fauntleroy Circus',
      city: 'London',
      postalcode: 'EC2 5NT',
      country: 'UK',
      phone: '(171) 555-1212'
    },
    {
      custid: 12,
      companyname: 'Cactus Comidas para llevar',
      contactname: 'Patricio Simpson',
      contacttitle: 'Sales Agent',
      address: 'Cerrito 333',
      city: 'Buenos Aires',
      postalcode: '1010',
      country: 'Argentina',
      phone: '(1) 135-5555',
      fax: '(1) 135-4892'
    },
    {
      custid: 13,
      companyname: 'Centro comercial Moctezuma',
      contactname: 'Francisco Chang',
      contacttitle: 'Marketing Manager',
      address: 'Sierras de Granada 9993',
      city: 'México D.F.',
      postalcode: '05022',
      country: 'Mexico',
      phone: '(5) 555-3392',
      fax: '(5) 555-7293'
    },
    {
      custid: 14,
      companyname: 'Chop-suey Chinese',
      contactname: 'Yang Wang',
      contacttitle: 'Owner',
      address: 'Hauptstr. 29',
      city: 'Bern',
      postalcode: '3012',
      country: 'Switzerland',
      phone: '0452-076545'
    },
    {
      custid: 15,
      companyname: 'Comércio Mineiro',
      contactname: 'Pedro Afonso',
      contacttitle: 'Sales Associate',
      address: 'Av. dos Lusíadas, 23',
      city: 'São Paulo',
      region: 'SP',
      postalcode: '05432-043',
      country: 'Brazil',
      phone: '(11) 555-7647'
    }
  ];

  getCustomers(filter: string = ''): Observable<Customer[]> {
    return of(
      this.mockCustomers.filter(customer =>
        customer.companyname.toLowerCase().includes(filter.toLowerCase())
      )
    ).pipe(delay(500));
  }

  // getCustomers(filter: string = ''): Observable<Customer[]> {
  //   const params = new HttpParams().set('name', filter);
  //   return this.http.get<Customer[]>(this.apiUrl, { params });
  // }
}