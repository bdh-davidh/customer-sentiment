import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchPatientData {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `https://dev-sapi.lemonaidpims.co.uk/sentiment/analyse`;

  fetchData(patientID: string) {
    const requestBody = { patientID };

    return this.http
      .post<string>(this.apiUrl, requestBody)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getMessages(patientID: string) {
    this.fetchData(patientID).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage =
            'Patient not found. Please check the patient ID and try again.';
          break;
        case 400:
          errorMessage =
            'Invalid patient ID format. Please enter a valid patient ID.';
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

    return throwError(() => new Error(errorMessage));
  }
}

/*
  TODO
    - Fetch patient data based on id
      - Disable fetch button and update message while loading
      - Check if patient id already exists (if so remove)
      - Push data to end responses array
    - If successful clear input value

    - If an error catch it and render a component, remove when fetch is clicked again
    - Include the error messages in the error component
  */
