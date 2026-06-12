import { Component, Input, OnInit } from '@angular/core';
import { DentalService } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental-service.service';
import { Provider } from '../../domains/Provider';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-providers',
    imports: [],
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.css'
})
export class ProvidersComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  @Input() service!: string;

  dentalService: DentalService = {
    id: -1,
    name: ''
  };
  providers: Provider[] = [];

  constructor(
    private dentalServiceManager: DentalServiceManager,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // This constructor is empty, but you can inject services if needed.
  }

  ngOnInit(): void {
    this.dentalServiceManager
      .getDentalServiceById(this.service)
      .pipe(
        switchMap((service) => {
          this.dentalService = service;
          console.log('Dental Service:', this.dentalService);
          return this.providerService.getProviders(this.location, this.service);
        })
      )
      .subscribe({
        next: (providers) => (this.providers = providers),
        error: (err) => console.error('Error loading data:', err),
      });
  }

  scheduleAppointment(id: number){
    this.router.navigate(['/categories',this.category,'locations',this.location,'services',this.service,'providers',id,'schedule']);
  }
}
