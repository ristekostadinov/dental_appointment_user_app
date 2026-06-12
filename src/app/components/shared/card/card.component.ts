import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DentalService } from '../../../domains/DentalService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
