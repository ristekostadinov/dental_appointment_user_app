import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports:  [CommonModule,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('scale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() message = '';
  @Input() confirmText = 'OK';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
