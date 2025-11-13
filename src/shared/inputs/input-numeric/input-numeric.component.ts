import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UiWarningIconDirective } from '../../icons/warning-icon.directive';
import { buildErrorMessages } from '../inputs-build-error-messages';
import { buildValidators } from '../inputs-build-validators';
import { ErrorMessageConfig, InputComponentOutput, NumericInputConfig } from '../inputs.model';

@Component({
  selector: 'ui-input-numeric',
  imports: [CommonModule, ReactiveFormsModule, UiWarningIconDirective],
  templateUrl: './input-numeric.component.html',
  styleUrls: ['../../../styles/primitives/inputs.scss', './input-numeric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumericComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectionTrigger = signal(0);
  private readonly inputHasHadValue = signal(false);

  // Form Control
  formControl!: FormControl;

  // Inputs
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly initialValue = input<number | null>(null);
  readonly preventDecimals = input<boolean>(false);
  readonly validators = input<NumericInputConfig>({});
  readonly labelPosition = input<'top' | 'left' | 'right'>('top');
  readonly size = input<'default' | 'compact'>('default');
  readonly showErrorMessage = input<boolean>(true);
  readonly errorMessages = input<ErrorMessageConfig>({});

  // Outputs
  readonly inputChange = output<InputComponentOutput<number>>();

  // Generated attributes
  readonly id = crypto.randomUUID();
  readonly ariaId = crypto.randomUUID();

  // Computed Signals
  readonly errorMessage = computed(() => {
    this.changeDetectionTrigger(); // Track form state changes
    if (!this.showErrorMessage() || !this.formControl.errors) return undefined;
    return buildErrorMessages(this.formControl.errors, this.errorMessages());
  });

  readonly inputIsInvalid = computed(() => {
    this.changeDetectionTrigger(); // Track form state changes
    return this.formControl.invalid && this.formControl.touched;
  });

  // Initialization
  ngOnInit(): void {
    this.initializeFormControl();
    this.setupInputSubscription();
  }

  private initializeFormControl(): void {
    const validatorConfig: NumericInputConfig = {
      required: true,
      min: 0,
      max: Infinity,
      ...this.validators(),
    };

    this.formControl = new FormControl<number | null>(this.initialValue());
    this.formControl.setValidators(buildValidators(validatorConfig));
  }

  private setupInputSubscription(): void {
    this.formControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      if (value !== null && value !== '') {
        this.inputHasHadValue.set(true);
      }
    });

    this.formControl.statusChanges.pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.changeDetectionTrigger.update(n => (n + 1) % 2);
      this.inputChange.emit({
        value: this.formControl.value,
        isValid: this.formControl.valid,
        errors: this.formControl.errors,
      });
    });
  }

  // Event Handlers
  handleOnBlur(): void {
    if (this.formControl.value) {
      const noLeadingZeros = this.preventLeadingZero(this.formControl.value);
      this.formControl.setValue(noLeadingZeros);
      // If input has been touched but returned to a null value
    } else {
      this.formControl.markAsTouched();
      this.changeDetectionTrigger.update(n => (n + 1) % 2);
    }
  }

  handleOnKeyDown(event: KeyboardEvent): void {
    this.preventInvalidChars(event);
  }

  handleOnPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const cleanValue = this.sanitizeNumericInput(pastedText);
    const target = event.target as HTMLInputElement;
    this.insertTextAtCursor(target, cleanValue);
    this.formControl.setValue(target.value);
  }

  // Input Validation & Sanitization Utility Methods
  private readonly preventInvalidChars = (event: KeyboardEvent): void => {
    if (this.preventDecimals()) {
      if ('.' === event.key) {
        event.preventDefault();
      }
    }

    if (['e', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  };

  private readonly preventLeadingZero = (value: string): string => {
    return String(value).replace(/^0+(?=[1-9]|0\.)/, '');
  };

  private readonly sanitizeNumericInput = (text: string): string => {
    const cleanValue = text.replace(/[^0-9.]/g, '');
    const parts = cleanValue.split('.');
    return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanValue;
  };

  /**
   * Inserts text at the current cursor position in an input element.
   * First attempts to use document.execCommand for insertion.
   * Falls back to splicing text into the input value and updating the selection range.
   */
  private readonly insertTextAtCursor = (target: HTMLInputElement, text: string): void => {
    target.focus();
    if (document.execCommand) {
      document.execCommand('insertText', false, text);
    } else {
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      target.value = target.value.slice(0, start) + text + target.value.slice(end);
      target.setSelectionRange(start + text.length, start + text.length);
    }
  };
}
