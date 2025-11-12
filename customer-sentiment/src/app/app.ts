import { Component, inject, signal } from '@angular/core';
import { InputNumericComponent } from '../inputs/input-numeric/input-numeric.component';
import { ButtonComponent } from '../button/button.component';
import { Response } from './response/response';
import { UserDataStore } from './user-data';
import { InputComponentOutput } from '../inputs/inputs.model';

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
  readonly userDataStore = inject(UserDataStore);
  readonly patientId = signal<string>('');
  
  onPatientIdChange(input: InputComponentOutput<number>): void {
    this.patientId.set(input.value?.toString() || '');
  }
  
  async onGetMessages(): Promise<void> {
    const id = this.patientId();
    if (id) {
      await this.userDataStore.loadPatientData(id);
    }
  }
  
  onClearAll(): void {
    this.userDataStore.clearAll();
    this.patientId.set('');
  }
}
