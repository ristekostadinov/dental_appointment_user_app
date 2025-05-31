import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../domains/Location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url = 'http://localhost:8080/api/public/locations';

  constructor(private _httpClient: HttpClient) { }

  getLocations() : Observable<Location[]> {
    return this._httpClient.get<Location[]>(this.url);
  }
}
