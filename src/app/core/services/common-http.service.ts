import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

type Apis = 'apiBaseUrl';

@Injectable({
     providedIn: 'root',
})
export class CommonHttpService {
     public http: HttpClient = inject(HttpClient);

     public get<T>(
          api: Apis,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const baseUrl = environment[api];
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.get<T>(`${baseUrl}/${endpoint}`, {
               params,
               headers
          });
     }

     public post<T>(
          api: Apis,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const baseUrl = environment[api];
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.post<T>(`${baseUrl}/${endpoint}`, {
               params,
               headers
          });
     }

     public put<T>(
          api: Apis,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const baseUrl = environment[api];
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.put<T>(`${baseUrl}/${endpoint}`, {
               params,
               headers
          });
     }

     public delete<T>(
          api: Apis,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const baseUrl = environment[api];
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.delete<T>(`${baseUrl}/${endpoint}`, {
               params,
               headers
          });
     }
}
