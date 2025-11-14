import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchPatientData {
  getMessages(patientID: string) {
    console.log(patientID);
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
