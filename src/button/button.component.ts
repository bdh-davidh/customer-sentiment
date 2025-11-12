
import { Component, input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

// Button styling variants
export type ButtonVariant = 'default' | 'outline' | 'destructive' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Reusable button component with customizable variants and sizes
 */
@Component({
  selector: 'button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[type]': 'type()',
    '(click)': 'onClick($event)',
  },
})
export class ButtonComponent {
  // Event emitter for click events
  clicked = new EventEmitter<Event>();

  // Component inputs
  type = input<'submit' | 'reset' | 'button'>('button');
  variant = input<'outline' | 'destructive' | 'text' | 'default'>('default');
  size = input<'small' | 'default' | 'large'>('default');
  icon = input<string>();

  // Handle click events
  onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
