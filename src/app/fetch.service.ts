import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { InputNumericComponent } from '../shared/inputs/input-numeric/input-numeric.component';
import { Responses } from './responses.service';
import { Errors } from './errors.service';
import { Response } from './models';

@Injectable({
  providedIn: 'root',
})
export class FetchPatientData {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `https://dev-sapi.lemonaidpims.co.uk/sentiment/analyse`;
  private responses = inject(Responses);
  private errors = inject(Errors);

  private fetchData(patient_id: string) {
    const requestBody = { patient_id };

    return this.http
      .post<Response>(this.apiUrl, requestBody)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private updateResponses(response: Response) {
    this.responses.data.update((existingResponses) => {
      const filteredResponses = existingResponses.filter(
        (existingResponse) =>
          existingResponse.patient_id !== response.patient_id,
      );
      return [response, ...filteredResponses];
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    switch (error.status) {
      case 404:
        errorMessage =
          'Patient not found. Please check the patient ID and try again.';
        break;
      case 400:
        errorMessage =
          'Invalid patient ID format. Please check the value entered and try again.';
        break;
      case 500:
        errorMessage = 'A server error occurred. Please try again later.';
        break;
      default:
        errorMessage = `Request failed with status ${error.status}. Please try again.`;
    }

    return throwError(() => new Error(errorMessage));
  }

  getMessages(input: InputNumericComponent) {
    // Clear any previous errors
    this.errors.data.set(null);

    this.fetchData(input.formControl.value).subscribe({
      next: (response) => {
        this.updateResponses(response);
        input.formControl.setValue('');
      },
      error: (error) => {
        this.errors.data.set(error.message);
      },
    });
  }
}

/*
  TODO
    - Fetch patient data based on id
      - Disable fetch button and update message while loading
  */
