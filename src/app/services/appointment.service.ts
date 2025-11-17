import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AppointmentBookedByPatient,
  AppointmentDTO,
  AppointmentRequest,
} from '../domains/Appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = 'http://localhost:8080/api/public/';
  urlPrivate = 'http://localhost:8080/api/appointments/';

  constructor(private httpClient: HttpClient) {}

  fetchBookedSlots(
    date: string,
    providerId: number
  ): Observable<AppointmentDTO[]> {
    return this.httpClient.get<AppointmentDTO[]>(
      `${this.url}appointments/booked-slots?date=${date}&resourceId=${providerId}`
    );
  }

  createAppointment(appointment: AppointmentRequest) {
    return this.httpClient.post<AppointmentDTO>(
      `${this.urlPrivate}create`,
      appointment,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  fetchPatientBookedAppointments(
    email: string
  ): Observable<AppointmentBookedByPatient[]> {
    return this.httpClient.get<AppointmentBookedByPatient[]>(
      `${this.urlPrivate}all/${email}`
    );
  }

  cancelAppointment(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.urlPrivate}${id}/cancel`, null);
  }
}
