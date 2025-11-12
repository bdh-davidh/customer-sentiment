import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-loading-spinner',
  template: `
    <div class="spinner" [attr.aria-label]="label()" role="status">
      <div class="spinner-circle"></div>
      @if (showText()) {
        <span class="spinner-text">{{ label() }}</span>
      }
    </div>
  `,
  styles: [`
    .spinner {
      display: flex;
      align-items: center;
      gap: var(--space-2x, 8px);
    }
    
    .spinner-circle {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-border, #e0e0e0);
      border-top: 2px solid var(--color-primary, #1976d2);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .spinner-text {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #666);
    }
  `],
  standalone: true
})
export class LoadingSpinnerComponent {
  label = input<string>('Loading...');
  showText = input<boolean>(true);
}