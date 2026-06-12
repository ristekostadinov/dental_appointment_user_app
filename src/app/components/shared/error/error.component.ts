import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error',
    imports: [],
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './error.component.css'
})
export class ErrorComponent {

  @Input() errorMessage: string = '';
  constructor(private _router: Router) { }

  goBack() {
    this._router.navigate(['/']);
  }

}
