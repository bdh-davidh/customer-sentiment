import { Component, inject } from '@angular/core';
import { InputNumericComponent } from '../shared/inputs/input-numeric/input-numeric.component';
import { ButtonComponent } from '../shared/button/button.component';
import { ResponseComponent } from './response/response';
import { FetchPatientData } from './fetch.service';
import { Responses } from './responses.service';
import { Errors } from './errors.service';
import { UiWarningIconDirective } from '../shared/icons/warning-icon.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.scss', './app.scss'],
  imports: [
    InputNumericComponent,
    ButtonComponent,
    ResponseComponent,
    UiWarningIconDirective,
  ],
  host: {
    class: 'flow box',
    style: '--flow-space: var(--space-4x-13x);',
  },
})
export class App {
  protected title = 'Customer Sentiment';
  fetchPatientData = inject(FetchPatientData);
  responses = inject(Responses);
  errors = inject(Errors);

  handleClearResults(input: InputNumericComponent) {
    this.responses.data.set([]);
    input.formControl.setValue('');
    this.errors.data.set(null);
  }

  handleGetMessagesClick(input: InputNumericComponent) {
    this.fetchPatientData.getMessages(input);
  }
}
