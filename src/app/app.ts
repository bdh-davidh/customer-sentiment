import { Component, inject } from '@angular/core';
import { InputNumericComponent } from '../shared/inputs/input-numeric/input-numeric.component';
import { ButtonComponent } from '../shared/button/button.component';
import { Response } from './response/response';
import { UserData } from './user-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.scss', './app.scss'],
  imports: [InputNumericComponent, ButtonComponent, Response],
  host: {
    class: 'box flow',
    style: '--flow-space: var(--space-4x-13x);',
  },
})
export class App {
  protected title = 'Customer Sentiment';

  userData = inject(UserData);
}
