import { Component, Input, OnInit } from '@angular/core';
import { DentalService } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental-service.service';
import { Provider } from '../../domains/Provider';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css'
})
export class ProvidersComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  @Input() service!: string;

  dentalService!: DentalService;
  providers: Provider[] = [];

  constructor(
    private _dentalServiceManager: DentalServiceManager
  ) {
    // This constructor is empty, but you can inject services if needed.
  }

  ngOnInit(): void {
    console.log(this.service);
    this._dentalServiceManager.getDentalServiceById(this.service).subscribe({
      next: (service: DentalService) => {
        this.dentalService = service;
      },
      error: (error) => {
        console.error('Error fetching dental service:', error);
      }
    });
  }

}
