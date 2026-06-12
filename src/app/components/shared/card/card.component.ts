import { Component, Input } from '@angular/core';
import { DentalService } from '../../../domains/DentalService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() dentalService!: DentalService;
  @Input() locationId!: string;
  @Input() categoryId!: string;

  constructor(private router: Router) {}

  selectService() {
    this.router.navigate([
      '/categories',
      this.categoryId,
      'locations',
      this.locationId,
      'services',
      this.dentalService.id,
      'providers',
    ]);
  }
}
