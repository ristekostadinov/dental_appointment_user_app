import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DentalService } from '../domains/DentalService';

@Injectable({
  providedIn: 'root'
})
export class DentalServiceManager {
  private readonly url = 'http://localhost:8080/api/public';
  constructor(private httpClient: HttpClient) { }

  getDentalServices(categoryId: string, locationId: string) : Observable<DentalService[]> {
   return this.httpClient.get<DentalService[]>(`${this.url}/categories/${categoryId}/locations/${locationId}/services`);
  }

  getDentalServiceById(serviceId: string): Observable<DentalService> {
    return this.httpClient.get<DentalService>(`${this.url}/services/${serviceId}`);
  }
}
