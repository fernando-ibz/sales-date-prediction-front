import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipper } from '../../shared/models/shipper.model';
import { CommonHttpService } from './common-http.service';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class ShipperService {
     public commonHttpService = inject(CommonHttpService)

     shippers: WritableSignal<Shipper[]> = signal([]);

     getShippers(): Observable<Shipper[]> {
          return this.commonHttpService.get<Shipper[]>(
               environment.apiBaseUrl,
               `Shippers`);
     }
}