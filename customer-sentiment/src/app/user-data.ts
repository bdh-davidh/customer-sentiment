import { Injectable, inject, signal, computed } from '@angular/core';
import { CustomerSentimentService } from '../core/services/customer-sentiment.service';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { UserData } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserDataStore {
  private readonly sentimentService = inject(CustomerSentimentService);

  private readonly _data = signal<UserData[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly isEmpty = computed(() => this._data().length === 0);

  async loadPatientData(patientId: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const result = await this.sentimentService.getPatientData(patientId).toPromise();
      if (result) {
        const existing = this._data().filter(d => d.patient_id !== patientId);
        this._data.set([result, ...existing]);
      }
    } catch (error: any) {
      this._error.set(error.message || 'Failed to load patient data');
    } finally {
      this._loading.set(false);
    }
  }

  clearAll(): void {
    this._data.set([]);
    this._error.set(null);
    this.sentimentService.clearCache();
  }
}
