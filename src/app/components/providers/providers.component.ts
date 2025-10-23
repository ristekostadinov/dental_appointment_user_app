import { Component, Input, OnInit } from '@angular/core';
import { DentalService } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental-service.service';
import { Provider } from '../../domains/Provider';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css',
})
export class ProvidersComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  @Input() service!: string;

  dentalService!: DentalService;
  providers!: Provider[];

  constructor(
    private dentalServiceManager: DentalServiceManager,
    private providerService: ProviderService
  ) {
    // This constructor is empty, but you can inject services if needed.
  }

  ngOnInit(): void {
    console.log(this.service);
    this.dentalServiceManager.getDentalServiceById(this.service).subscribe({
      next: (service: DentalService) => {
        this.dentalService = service;
      },
      error: (error) => {
        console.error('Error fetching dental service:', error);
      },
    });

    this.providerService.getProviders(this.location, this.service).subscribe({
      next: (providers: Provider[]) => {
        this.providers = providers;
      },
      error: (error) => {
        console.error('Error fetching providers:', error);
      },
    });
  }
}
