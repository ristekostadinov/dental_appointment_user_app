import { Component, Input, OnInit } from '@angular/core';

import { AppointmentService } from '../../services/appointment.service';
import { ProviderService } from '../../services/provider.service';
import { Provider, ProviderWithoutPrice } from '../../domains/Provider';
import { DentalService } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental-service.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { AppointmentDTO, AppointmentRequest } from '../../domains/Appointment';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-schedule-appointment',
    imports: [ModalComponent],
    templateUrl: './schedule-appointment.component.html',
    styleUrl: './schedule-appointment.component.css'
})
export class ScheduleAppointmentComponent implements OnInit {
  @Input() location!: string;
  @Input() service!: string;
  @Input() provider!: string;

  userEmail: string = '';

  showErrorModal: boolean = false;
  showSuccessModal: boolean = false;

  dentalServiceProvider!: ProviderWithoutPrice;
  dentalService!: DentalService;
  bookedAppointments!: AppointmentDTO[];

  selectedDate: string = '';
  availableSlots: string[] = [];
  selectedSlot: string | null = null;
  loading = false;
  today: string = new Date().toISOString().split('T')[0];

  // Example: all slots between 09:00 and 17:00 (every 30 min)
  allSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
  ];

  freeSlots = [];

  constructor(
    private appointmentService: AppointmentService,
    private providerService: ProviderService,
    private dentalServiceManager: DentalServiceManager,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.userEmail = user ? user.email : '';
    });

    this.providerService
      .getProviderById(this.provider)
      .subscribe((response) => {
        this.dentalServiceProvider = response;
      });

    this.dentalServiceManager
      .getDentalServiceById(this.service)
      .subscribe((response) => {
        this.dentalService = response;
      });
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    //this.fetchBookedSlots();
    this.fetchBookedSlots();
  }

  isPastSlot(slot: string): boolean {
    // Only disable past slots if booking for today
    if (this.selectedDate !== this.today) return false;

    const now = new Date();
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  }

  isBooked(slot: string): boolean {
    if (!this.bookedAppointments?.length) return false;

    // Extract hour and minute from the slot string
    const [hour, minute] = slot.split(':').map(Number);

    // Build the slot’s Date object using the selected date
    const slotDateTime = new Date(this.selectedDate);
    slotDateTime.setHours(hour, minute, 0, 0); // set exact time

    // Check if this slot overlaps with any booked appointment
    return this.bookedAppointments.some((appointment) => {
      const from = new Date(appointment.fromDateTime);
      const to = new Date(appointment.toDateTime);
      return slotDateTime >= from && slotDateTime < to;
    });
  }

  fetchBookedSlots(): void {
    if (!this.selectedDate) return;

    this.loading = true;
    console.log('Fetching booked slots for date:', this.selectedDate);

    // Adjust this URL to your actual API endpoint
    this.appointmentService
      .fetchBookedSlots(this.selectedDate, this.dentalServiceProvider.id)
      .subscribe({
        next: (response) => {
          this.bookedAppointments = response;
          this.loading = false;
          console.log(this.bookedAppointments);
        },
        error: () => {
          this.loading = false;
          this.showErrorModal = true;
        },
      });
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }

  confirmAppointment() {
    if (!this.selectedDate || !this.selectedSlot) return;

    // 1. Get the local timezone offset (e.g., "+01:00")
    const timezoneOffset = this.getTimezoneOffset();

    // 2. Combine selected date, time, and timezone for the start time
    // Example: "2025-11-08T09:00:00+01:00"
    const fromZonedString = `${this.selectedDate}T${this.selectedSlot}:00${timezoneOffset}`;

    // 3. Calculate the end time (30 minutes later)
    const [hours, minutes] = this.selectedSlot.split(':').map(Number);
    const fromDate = new Date(this.selectedDate);
    // Set the hours/minutes based on local time
    fromDate.setHours(hours, minutes, 0, 0);

    // Use a fixed 30 minutes duration
    const DURATION_MS = 30 * 60 * 1000;
    const toDate = new Date(fromDate.getTime() + DURATION_MS);

    // Extract the new time for the end slot string
    const toSlotTime = `${this.pad(toDate.getHours())}:${this.pad(
      toDate.getMinutes()
    )}`;

    // 4. Combine date, end time, and timezone for the end time
    // Example: "2025-11-08T09:30:00+01:00"
    const toZonedString = `${this.selectedDate}T${toSlotTime}:00${timezoneOffset}`;

    // 5. Build the AppointmentRequest DTO
    const appointmentRequest: AppointmentRequest = {
      // These strings now include the offset, e.g., +01:00
      fromDateTime: fromZonedString,
      toDateTime: toZonedString,
      resourceId: this.dentalServiceProvider.id,
      dentalServiceId: this.dentalService.id,
      patientEmail: this.userEmail,
    };

    console.log('AppointmentRequest:', appointmentRequest);

    // Send to backend
    this.appointmentService.createAppointment(appointmentRequest).subscribe({
      next: () => {
        this.showSuccessModal = true;
        this.fetchBookedSlots();
      },
      error: () => {
        this.showErrorModal = true;
      },
    });
  }

  private getTimezoneOffset(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset(); // returns minutes difference from UTC
    const sign = offset < 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;

    return sign + this.pad(hours) + ':' + this.pad(minutes);
  }

  // 💡 HELPER FUNCTION to pad single digits (09, 05)
  private pad(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}
