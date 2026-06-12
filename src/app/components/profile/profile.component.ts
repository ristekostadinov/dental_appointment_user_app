import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { AppointmentBookedByPatient } from '../../domains/Appointment';
import { DatePipe } from '@angular/common';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
    selector: 'app-profile',
    imports: [DatePipe, ModalComponent],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  bookedAppointments!: AppointmentBookedByPatient[];
  email = '';

  showSuccessfulModal: boolean = false;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService
  ){

  }

  ngOnInit(): void {
     this.authService.currentUser.subscribe((user) => {
      this.email = user ? user.email : '';
    });
    
    this.loadAppointments();
  }

  loadAppointments(){
    this.appointmentService.fetchPatientBookedAppointments(this.email).subscribe(response => {
      this.bookedAppointments = response;
    });
  }

  cancelAppointment(id: number){
    this.appointmentService.cancelAppointment(id).subscribe(()=> {
      this.showSuccessfulModal = true;
      this.loadAppointments();
    });
  }

}
