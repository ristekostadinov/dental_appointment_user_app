import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../domains/Provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private readonly url = 'http://localhost:8080/api/public';
  constructor(private httpClient: HttpClient) { }

  getProviders(location: string, service: string) : Observable<Provider[]> {
    return this.httpClient.get<Provider[]>(`${this.url}/locations/${location}/services/${service}/resources`);
  }
}
