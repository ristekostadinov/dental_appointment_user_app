import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dental-services',
  standalone: true,
  imports: [],
  templateUrl: './dental-services.component.html',
  styleUrl: './dental-services.component.css'
})
export class DentalServicesComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  message: string = '';
  ngOnInit() : void{
    this.message = `Resources for category: ${this.category} in location: ${this.location}`;
  }
}
