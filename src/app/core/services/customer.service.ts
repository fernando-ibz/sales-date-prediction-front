import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'api/customers';
  customers: WritableSignal<Customer[]> = signal([]);

  constructor(private http: HttpClient) {
    this.customers.set([
      {
        custId: 1,
        companyName: 'Alfreds Futterkiste',
        contactName: 'Maria Anders',
        contactTitle: 'Sales Representative',
        address: 'Obere Str. 57',
        city: 'Berlin',
        region: 'Western Europe',
        postalCode: '12209',
        country: 'Germany',
        phone: '030-0074321',
        fax: '030-0076545'
      },
      {
        custId: 2,
        companyName: 'Ana Trujillo Emparedados y helados',
        contactName: 'Ana Trujillo',
        contactTitle: 'Owner',
        address: 'Avda. de la Constitución 2222',
        city: 'México D.F.',
        postalCode: '05021',
        country: 'Mexico',
        phone: '(5) 555-4729',
        fax: '(5) 555-3745'
      },
      {
        custId: 3,
        companyName: 'Antonio Moreno Taquería',
        contactName: 'Antonio Moreno',
        contactTitle: 'Owner',
        address: 'Mataderos  2312',
        city: 'México D.F.',
        postalCode: '05023',
        country: 'Mexico',
        phone: '(5) 555-3932'
      },
      {
        custId: 4,
        companyName: 'Around the Horn',
        contactName: 'Thomas Hardy',
        contactTitle: 'Sales Representative',
        address: '120 Hanover Sq.',
        city: 'London',
        postalCode: 'WA1 1DP',
        country: 'UK',
        phone: '(171) 555-7788',
        fax: '(171) 555-6750'
      },
      {
        custId: 5,
        companyName: 'Berglunds snabbköp',
        contactName: 'Christina Berglund',
        contactTitle: 'Order Administrator',
        address: 'Berguvsvägen  8',
        city: 'Luleå',
        postalCode: 'S-958 22',
        country: 'Sweden',
        phone: '0921-12 34 65',
        fax: '0921-12 34 67'
      },
      {
        custId: 6,
        companyName: 'Blauer See Delikatessen',
        contactName: 'Hanna Moos',
        contactTitle: 'Sales Representative',
        address: 'Forsterstr. 57',
        city: 'Mannheim',
        postalCode: '68306',
        country: 'Germany',
        phone: '0621-08460',
        fax: '0621-08924'
      },
      {
        custId: 7,
        companyName: 'Blondel père et fils',
        contactName: 'Frédérique Citeaux',
        contactTitle: 'Marketing Manager',
        address: '24, place Kléber',
        city: 'Strasbourg',
        postalCode: '67000',
        country: 'France',
        phone: '88.60.15.31',
        fax: '88.60.15.32'
      },
      {
        custId: 8,
        companyName: 'Bólido Comidas preparadas',
        contactName: 'Martín Sommer',
        contactTitle: 'Owner',
        address: 'C/ Araquil, 67',
        city: 'Madrid',
        postalCode: '28023',
        country: 'Spain',
        phone: '(91) 555 22 82',
        fax: '(91) 555 91 99'
      },
      {
        custId: 9,
        companyName: 'Bon app\'',
        contactName: 'Laurence Lebihan',
        contactTitle: 'Owner',
        address: '12, rue des Bouchers',
        city: 'Marseille',
        postalCode: '13008',
        country: 'France',
        phone: '91.24.45.40',
        fax: '91.24.45.41'
      },
      {
        custId: 10,
        companyName: 'Bottom-Dollar Markets',
        contactName: 'Elizabeth Lincoln',
        contactTitle: 'Accounting Manager',
        address: '23 Tsawassen Blvd.',
        city: 'Tsawassen',
        region: 'BC',
        postalCode: 'T2F 8M4',
        country: 'Canada',
        phone: '(604) 555-4729',
        fax: '(604) 555-3745'
      },
      {
        custId: 11,
        companyName: 'B\'s Beverages',
        contactName: 'Victoria Ashworth',
        contactTitle: 'Sales Representative',
        address: 'Fauntleroy Circus',
        city: 'London',
        postalCode: 'EC2 5NT',
        country: 'UK',
        phone: '(171) 555-1212'
      },
      {
        custId: 12,
        companyName: 'Cactus Comidas para llevar',
        contactName: 'Patricio Simpson',
        contactTitle: 'Sales Agent',
        address: 'Cerrito 333',
        city: 'Buenos Aires',
        postalCode: '1010',
        country: 'Argentina',
        phone: '(1) 135-5555',
        fax: '(1) 135-4892'
      },
      {
        custId: 13,
        companyName: 'Centro comercial Moctezuma',
        contactName: 'Francisco Chang',
        contactTitle: 'Marketing Manager',
        address: 'Sierras de Granada 9993',
        city: 'México D.F.',
        postalCode: '05022',
        country: 'Mexico',
        phone: '(5) 555-3392',
        fax: '(5) 555-7293'
      },
      {
        custId: 14,
        companyName: 'Chop-suey Chinese',
        contactName: 'Yang Wang',
        contactTitle: 'Owner',
        address: 'Hauptstr. 29',
        city: 'Bern',
        postalCode: '3012',
        country: 'Switzerland',
        phone: '0452-076545'
      },
      {
        custId: 15,
        companyName: 'Comércio Mineiro',
        contactName: 'Pedro Afonso',
        contactTitle: 'Sales Associate',
        address: 'Av. dos Lusíadas, 23',
        city: 'São Paulo',
        region: 'SP',
        postalCode: '05432-043',
        country: 'Brazil',
        phone: '(11) 555-7647'
      }
    ]);
  }

  getCustomers(filter: string = ''): Observable<Customer[]> {
    return of(
      this.customers().filter(customer =>
        customer.companyName.toLowerCase().includes(filter.toLowerCase())
      )
    ).pipe(delay(500));
  }

  // getCustomers(filter: string = ''): Observable<Customer[]> {
  //   const params = new HttpParams().set('name', filter);
  //   return this.http.get<Customer[]>(this.apiUrl, { params });
  // }
}