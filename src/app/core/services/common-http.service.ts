import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root',
})
export class CommonHttpService {
     public http: HttpClient = inject(HttpClient);

     public get<T>(
          api: string,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.get<T>(`${api}/${endpoint}`, {
               params,
               headers
          });
     }

     public post<T>(
          api: string,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.post<T>(`${api}/${endpoint}`, {
               params,
               headers
          });
     }

     public put<T>(
          api: string,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.put<T>(`${api}/${endpoint}`, {
               params,
               headers
          });
     }

     public delete<T>(
          api: string,
          endpoint: string,
          params?: HttpParams,
          silentError: boolean = false
     ): Observable<T> {
          const headers = silentError ? new HttpHeaders({ 'X-Silent-Error': 'true' }) : undefined;

          return this.http.delete<T>(`${api}/${endpoint}`, {
               params,
               headers
          });
     }
}
