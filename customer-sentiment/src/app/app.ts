import { Component } from '@angular/core';
import { InputNumericComponent } from '../inputs/input-numeric/input-numeric.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.scss', './app.scss'],
  imports: [InputNumericComponent, ButtonComponent],
  host: {
    'class': 'box flow',
    'style': '--flow-space: var(--space-4x-13x);'
  }
})
export class App {
  protected title = 'customer-sentiment';
}
