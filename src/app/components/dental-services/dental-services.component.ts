import { Component, Input, OnInit } from '@angular/core';
import { DentalService } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental-service.service';
import { Router } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-dental-services',
  standalone: true,
  imports: [ErrorComponent, CardComponent],
  templateUrl: './dental-services.component.html',
  styleUrl: './dental-services.component.css'
})
export class DentalServicesComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  
  dentalServices: DentalService[] = [];
  errorMessage: string = '';
  constructor(
    private _dentalServiceManager: DentalServiceManager,
    private _router: Router
  ) { }

  ngOnInit() : void{
    this.fetchDentalServices();
  }

  fetchDentalServices() {
    this._dentalServiceManager.getDentalServices(this.category, this.location)
      .subscribe({
        next: (data) => {
          this.dentalServices = data;
          console.log('Dental services fetched successfully:', this.dentalServices);
        },
        error: (err) => {
          console.error('Error fetching dental services:', err);
          this.errorMessage = 'Failed to load dental services. Please try again later.';
        }
      });
  }
}
