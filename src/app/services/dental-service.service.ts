import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DentalService } from '../domains/DentalService';

@Injectable({
  providedIn: 'root'
})
export class DentalServiceManager {
  url = 'http://localhost:8080/api/public';
  constructor(private _httpClient: HttpClient) { }

  getDentalServices(categoryId: string, locationId: string) : Observable<DentalService[]> {
   return this._httpClient.get<DentalService[]>(`${this.url}/categories/${categoryId}/locations/${locationId}/services`);
  }

  getDentalServiceById(serviceId: string): Observable<DentalService> {
    return this._httpClient.get<DentalService>(`${this.url}/services/${serviceId}`);
  }
}
