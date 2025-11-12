import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { UserData } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerSentimentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/sentiment/analyse`;
  private readonly cache = new Map<string, UserData>();

  getPatientData(patientId: string): Observable<UserData> {
    const cached = this.cache.get(patientId);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    const requestBody = { patient_id: patientId };

    return this.http.post<UserData>(this.apiUrl, requestBody)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  clearCache(): void {
    this.cache.clear();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'Patient not found. Please check the patient ID and try again.';
          break;
        case 400:
          errorMessage = 'Invalid patient ID format. Please enter a valid patient ID.';
          break;
        case 500:
          errorMessage = 'Server error occurred. Please try again later.';
          break;
        case 0:
          errorMessage = 'Unable to connect to the server.';
          break;
        default:
          errorMessage = `Request failed with status ${error.status}. Please try again.`;
      }
    }

    if (environment.enableLogging) {
      console.error('API Error:', error);
    }

    return throwError(() => new Error(errorMessage));
  }
}
