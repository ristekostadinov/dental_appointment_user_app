import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { SignInRequest, SignUpRequest } from '../domains/Patient';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  url = 'http://localhost:8080/'

  constructor(private _http: HttpClient) {
    //@ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('authenticatedPatient')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserSubject.value;
  }

  login(signInRequest: SignInRequest): Observable<SignInRequest> {
    return this._http.post<SignInRequest>(`${this.url}api/v1/auth/sign_in_patient`, signInRequest)
      .pipe(tap(() => {
          localStorage.setItem('authenticatedPatient', '');
        }),
        map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('authenticatedPatient', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): Observable<any> {
    // remove user from local storage and set current user to null
    localStorage.removeItem('authenticatedPatient');
    this.currentUserSubject.next(null);
    return of(true);
  }

  signUp(singUpRequest: SignUpRequest): Observable<SignUpRequest> {
    return this._http.post<SignUpRequest>(`${this.url}api/v1/auth/sign_up_patient`, singUpRequest);
  }
}
