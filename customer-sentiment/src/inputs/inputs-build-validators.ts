import { ValidatorFn, Validators } from '@angular/forms';
import { InputConfig } from './inputs.model';

export function buildValidators(config: InputConfig): ValidatorFn[] {
  const builtValidators: ValidatorFn[] = [];

  if (config.required !== false) {
    builtValidators.push(Validators.required);
  }

  if ('min' in config && typeof config.min === 'number') {
    builtValidators.push(Validators.min(config.min));
  }

  if ('max' in config && typeof config.max === 'number') {
    builtValidators.push(Validators.max(config.max));
  }

  if ('minLength' in config && typeof config.minLength === 'number') {
    builtValidators.push(Validators.minLength(config.minLength));
  }

  if ('maxLength' in config && typeof config.maxLength === 'number') {
    builtValidators.push(Validators.maxLength(config.maxLength));
  }

  return builtValidators;
}
