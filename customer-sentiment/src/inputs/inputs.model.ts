import { ValidationErrors } from '@angular/forms';

// Inputs
export interface BaseInputConfig {
  required?: boolean;
}

export interface NumericInputConfig extends BaseInputConfig {
  min?: number;
  max?: number;
}

export interface TextInputConfig extends BaseInputConfig {
  minLength?: number;
  maxLength?: number;
}

// Union type combining all input interfaces
export type InputConfig = BaseInputConfig | NumericInputConfig | TextInputConfig;

// Inputs and Related Error Messages
export interface BaseErrorMessageConfig {
  required?: string;
}

export interface NumericInputErrorMessageConfig extends BaseErrorMessageConfig {
  min?: string;
  max?: string;
}

export interface TextInputErrorMessageConfig extends BaseErrorMessageConfig {
  minLength?: string;
  maxLength?: string;
}

// // Union type combining all input interfaces
export type ErrorMessageConfig = BaseErrorMessageConfig | NumericInputErrorMessageConfig | TextInputErrorMessageConfig;

// Outputs
export interface InputComponentOutput<T> {
  value: T;
  isValid: boolean;
  errors?: ValidationErrors | null;
}
