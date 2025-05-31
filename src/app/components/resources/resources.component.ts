import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit {
  @Input() category!: string;
  @Input() location!: string;
  message: string = '';
  ngOnInit() : void{
    this.message = `Resources for category: ${this.category} in location: ${this.location}`;
  }
}
