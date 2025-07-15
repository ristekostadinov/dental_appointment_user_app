import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  @Input() errorMessage: string = '';
  constructor(private _router: Router) { }

  goBack() {
    this._router.navigate(['/']);
  }

}
