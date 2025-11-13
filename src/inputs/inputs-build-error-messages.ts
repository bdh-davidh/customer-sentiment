import { ValidationErrors } from '@angular/forms';
import { ErrorMessageConfig } from './inputs.model';

/**
 * Builds user-friendly error messages for form validation errors
 * Prioritizes custom messages over defaults and supports template interpolation
 * Supports {{variable}} syntax for accessing error object properties
 */
export function buildErrorMessages(errors: ValidationErrors, errorMessages: ErrorMessageConfig, value = ''): string {
  const defaultMessages = {
    required: 'This field is required.',
    min: `Please enter a value of ${errors['min']?.min} or above.`,
    max: `Please enter a value of ${errors['max']?.max} or lower.`,
    minLength: `You have ${value.length - errors['minlength']?.requiredLength} ${value.length - errors['minlength']?.requiredLength === 1 ? 'character' : 'characters'} too few.`,
    maxLength: `You have ${value.length - errors['maxlength']?.requiredLength} ${value.length - errors['maxlength']?.requiredLength === 1 ? 'character' : 'characters'} too many.`,
  };

  // Maps user-friendly keys to Angular validation error keys
  const errorKeyMap = {
    required: 'required',
    min: 'min',
    max: 'max',
    minLength: 'minlength',
    maxLength: 'maxlength',
  };

  // Loop through each error type to find the first matching error
  for (const [messageKey, errorKey] of Object.entries(errorKeyMap)) {
    if (errors[errorKey]) {
      const customMessage = errorMessages[messageKey as keyof ErrorMessageConfig];
      // If there is a custom message use that
      if (typeof customMessage === 'string') {
        return customMessage;
      }
      // Else fall back to default message if no custom message provided
      return defaultMessages[messageKey as keyof typeof defaultMessages];
    }
  }
  // Fallback message if no specific error type is handled
  return 'Please check this field there seems to be an error.';
}
