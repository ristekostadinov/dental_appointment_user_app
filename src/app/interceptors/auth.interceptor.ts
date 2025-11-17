import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// src/app/interceptors/auth.interceptor.ts
// IMPORTANT: Use HttpInterceptorFn from @angular/common/http


export const authInterceptor: HttpInterceptorFn = (req, next) => {
const patientDataString = localStorage.getItem('authenticatedPatient');
    let rawToken: string | null = null;
    
    if (patientDataString) {
      try {
        // Parse the JSON string to get the object
        const patientData = JSON.parse(patientDataString);
        // Assuming the token is stored under a 'token' property
        rawToken = patientData.token; 
      } catch (e) {
        // Handle case where patientDataString is not valid JSON 
        // (e.g., if you mistakenly stored the token raw previously)
        console.error("Failed to parse authenticatedPatient data from localStorage:", e);
      }
    }
    
    // Bypass for public routes
    if (req.url.includes('/api/public/')) {
        return next(req);
    }
    
    // Check for the raw token
    let authReq = req;
    if (rawToken) {
        authReq = req.clone({
            setHeaders: {
                // Now you are sending only the raw JWT string
                Authorization: `Bearer ${rawToken}`,
            },
        });
    }

    // ... rest of the interceptor logic
    return next(authReq);
};