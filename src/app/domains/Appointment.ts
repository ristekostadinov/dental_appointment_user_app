export interface AppointmentDTO {
  id: number;
  fromDateTime: string;
  toDateTime: string;
}

export interface AppointmentRequest {
  fromDateTime: string;
  toDateTime: string;
  resourceId: number;
  dentalServiceId: number;
  patientEmail: string;
}

export interface AppointmentBookedByPatient {
  id: number;
  resourceName: string;
  dentalServiceName: string;
  fromDateTime: string;
  toDateTime: string;
}
