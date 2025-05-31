import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DentalService } from '../domains/DentalService';

@Injectable({
  providedIn: 'root'
})
export class DentalServiceManager {
  url = 'http://localhost:8080/api/public/services';
  constructor(private _httpClient: HttpClient) { }

  getDentalServices(categoryId: string, locationId: string) : Observable<DentalService> {
    const params = new HttpParams();
    params.set('categoryId', categoryId.toString());
    params.set('locationId', locationId.toString());
    return this._httpClient.get<DentalService>(this.url, { params });
  }
}
