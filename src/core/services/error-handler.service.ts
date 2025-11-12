import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: any, context?: string): string {
    const message = error?.message || 'An unexpected error occurred';
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    return message;
  }

  logInfo(message: string, data?: any): void {
    console.log(message, data);
  }
}