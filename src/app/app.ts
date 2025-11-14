import { Component, inject } from '@angular/core';
import { InputNumericComponent } from '../shared/inputs/input-numeric/input-numeric.component';
import { ButtonComponent } from '../shared/button/button.component';
import { ResponseComponent } from './response/response';
import { FetchPatientData } from './fetch.service';
import { Users } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.scss', './app.scss'],
  imports: [InputNumericComponent, ButtonComponent, ResponseComponent],
  host: {
    class: 'flow box',
    style: '--flow-space: var(--space-4x-13x);',
  },
})
export class App {
  protected title = 'Customer Sentiment';
  fetchPatientData = inject(FetchPatientData);
  users = inject(Users);

  handleClick(input: string) {
    this.fetchPatientData.getMessages(input);
  }
}
