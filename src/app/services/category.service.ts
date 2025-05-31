import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../domains/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8080/api/public/categories';
  constructor(private _httpClient: HttpClient) { }

  getCategories() : Observable<Category[]>{
    return this._httpClient.get<Category[]>(this.url);
  }
}
